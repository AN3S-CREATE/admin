import { chromium, type Browser, type Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// Role definitions
const ROLES = [
  'admin',
  'ops',
  'hr',
  'safety',
  'viewer'
];

// Screen mappings (subset for demonstration, to be expanded)
const ROLE_SCREENS: Record<string, string[]> = {
  admin: [
    '/dashboard',
    '/dashboard/operations',
    '/dashboard/plant',
    '/dashboard/transport',
    '/dashboard/tracking',
    '/dashboard/alerts',
    '/dashboard/people',
    '/dashboard/risk',
    '/dashboard/reports',
    '/dashboard/integrations',
    '/dashboard/admin',
  ],
  ops: [
    '/dashboard/operations',
    '/dashboard/plant',
    '/dashboard/transport',
    '/dashboard/tracking',
    '/dashboard/alerts',
  ],
  hr: [
    '/dashboard/people',
  ],
  safety: [
    '/dashboard/risk',
    '/dashboard/alerts',
  ],
  viewer: [
    '/dashboard',
    '/dashboard/reports',
  ],
};

interface ScreenshotManifestItem {
  role: string;
  screen: string;
  filename: string;
  path: string; // internal zip path
}

async function generateScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  const baseUrl = 'http://localhost:3000';
  const screenshotDir = path.join(process.cwd(), 'public', 'screenshots');

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const manifest: ScreenshotManifestItem[] = [];

  try {
    for (const role of ROLES) {
      console.log(`Processing role: ${role}`);
      const screens = ROLE_SCREENS[role];

      if (!screens) continue;

      for (const screen of screens) {
        console.log(`  Navigating to ${screen}...`);
        const page = await context.newPage();

        // Set the mock role in localStorage
        await page.addInitScript((role) => {
            window.localStorage.setItem('MOCK_ROLE', role);
        }, role);

        try {
            // Increased timeout and changed wait condition to be more robust for some heavy pages
            await page.goto(`${baseUrl}${screen}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

            // Wait a bit for animations and potential data fetching
            await page.waitForTimeout(5000);

            const screenName = screen.replace('/dashboard', '').replace('/', '') || 'overview';
            const filename = `${role}_${screenName}.png`;
            const filepath = path.join(screenshotDir, filename);

            await page.screenshot({ path: filepath, fullPage: true });
            console.log(`  Saved ${filename}`);

            manifest.push({
              role,
              screen: screenName,
              filename,
              path: `${role}/${screenName}.png`
            });

        } catch (e) {
            console.error(`  Failed to capture ${screen} for ${role}:`, e);
        } finally {
            await page.close();
        }
      }
    }

    // Write manifest
    fs.writeFileSync(
      path.join(screenshotDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('  Saved manifest.json');

  } catch (error) {
    console.error('Error generating screenshots:', error);
  } finally {
    await browser.close();
  }
}

generateScreenshots();
