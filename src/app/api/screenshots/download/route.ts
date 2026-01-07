import { NextResponse } from 'next/server';
import archiver from 'archiver';
import path from 'path';
import { promises as fs } from 'fs';
import { PassThrough } from 'stream';

// Helper to convert Node.js Readable to Web ReadableStream
function nodeStreamToWeb(nodeStream: NodeJS.ReadableStream): ReadableStream {
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk: any) => {
        controller.enqueue(chunk);
      });
      nodeStream.on('end', () => {
        controller.close();
      });
      nodeStream.on('error', (err: any) => {
        controller.error(err);
      });
    },
    cancel() {
      if ('destroy' in nodeStream && typeof (nodeStream as any).destroy === 'function') {
        (nodeStream as any).destroy();
      }
    },
  });
}

interface ScreenshotManifestItem {
  role: string;
  screen: string;
  filename: string;
  path: string; // internal zip path
}

export async function GET() {
  const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');
  const manifestPath = path.join(screenshotsDir, 'manifest.json');

  try {
    await fs.access(screenshotsDir);
  } catch (error) {
     return new NextResponse('Screenshots directory not found', { status: 404 });
  }

  const passThrough = new PassThrough();
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  // Handle errors
  archive.on('error', (err: any) => {
    console.error('Archiver error:', err);
    passThrough.destroy(err);
  });

  // Pipe archive to passThrough
  archive.pipe(passThrough);

  // Start processing files asynchronously
  (async () => {
    try {
      let filesToZip: { fsPath: string; zipPath: string }[] = [];
      let usedManifest = false;

      // Try reading manifest first
      try {
        const manifestContent = await fs.readFile(manifestPath, 'utf-8');
        const manifest = JSON.parse(manifestContent) as ScreenshotManifestItem[];
        filesToZip = manifest.map(item => ({
          fsPath: path.join(screenshotsDir, item.filename),
          zipPath: item.path
        }));
        usedManifest = true;
      } catch (e) {
        console.warn('Manifest not found or invalid, falling back to directory scan:', e);
      }

      if (!usedManifest) {
        const files = await fs.readdir(screenshotsDir);
        for (const file of files) {
          if (!file.endsWith('.png')) continue;

          const parts = file.split('_');
          let zipPath = file;

          if (parts.length >= 2) {
            const role = parts[0];
            const screen = parts.slice(1).join('_');
            zipPath = `${role}/${screen}`;
          }

          filesToZip.push({
            fsPath: path.join(screenshotsDir, file),
            zipPath
          });
        }
      }

      for (const { fsPath, zipPath } of filesToZip) {
         try {
           // Verify file exists before adding
           await fs.access(fsPath);
           archive.file(fsPath, { name: zipPath });
         } catch (e) {
           console.warn(`File not found: ${fsPath}`, e);
         }
      }

      await archive.finalize();
    } catch (err) {
      console.error('Error adding files to archive:', err);
      passThrough.destroy(err as Error);
    }
  })();

  // Return the stream
  const webStream = nodeStreamToWeb(passThrough);

  return new NextResponse(webStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=hub-screenshots.zip',
    },
  });
}
