const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROLES = {
  admin: [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Transport', url: '/dashboard/transport' },
    { name: 'Plant', url: '/dashboard/plant' },
    { name: 'Operations', url: '/dashboard/operations' },
    { name: 'Risk', url: '/dashboard/risk' },
    { name: 'People', url: '/dashboard/people' },
    { name: 'Reports', url: '/dashboard/reports' },
    { name: 'Tracking', url: '/dashboard/tracking' },
    { name: 'Alerts', url: '/dashboard/alerts' },
    { name: 'Integrations', url: '/dashboard/integrations' },
    { name: 'Admin', url: '/dashboard/admin' },
  ],
  ops: [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Transport', url: '/dashboard/transport' },
    { name: 'Plant', url: '/dashboard/plant' },
    { name: 'Operations', url: '/dashboard/operations' },
    { name: 'Risk', url: '/dashboard/risk' },
    { name: 'Tracking', url: '/dashboard/tracking' },
    { name: 'Alerts', url: '/dashboard/alerts' },
    { name: 'Reports', url: '/dashboard/reports' },
  ],
  hr: [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'People', url: '/dashboard/people' },
    { name: 'Reports', url: '/dashboard/reports' },
  ],
  safety: [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Risk', url: '/dashboard/risk' },
    { name: 'Alerts', url: '/dashboard/alerts' },
    { name: 'Reports', url: '/dashboard/reports' },
    { name: 'Transport', url: '/dashboard/transport' },
    { name: 'Plant', url: '/dashboard/plant' },
  ],
  viewer: [
    { name: 'Dashboard', url: '/dashboard' },
  ],
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  console.log('Navigating to login...');
  await page.goto('http://localhost:3000/login');

  // Login Logic
  try {
    console.log('Waiting for "Continue as Guest" button...');
    await page.waitForSelector('button:has-text("Continue as Guest")', { timeout: 5000 });
    await page.click('button:has-text("Continue as Guest")');
    console.log('Clicked "Continue as Guest"');
  } catch (e) {
    console.log('Could not find "Continue as Guest" button. Trying to login with demo credentials...');
    try {
        await page.fill('input[type="email"]', 'demo@veramine.com');
        await page.fill('input[type="password"]', 'password');
        await page.click('button[type="submit"]');
        console.log('Clicked "Sign In"');
    } catch (e2) {
        console.log("Login form interaction failed.");
    }
  }

  // Wait for dashboard
  try {
    console.log('Waiting for redirection to dashboard...');
    await page.waitForURL('**/dashboard', { timeout: 60000 });
    console.log('Logged in successfully.');
  } catch (e) {
    console.log('Redirect timeout. Forcing navigation to dashboard...');
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  for (const [role, screens] of Object.entries(ROLES)) {
    console.log(`Processing role: ${role}`);
    for (const screen of screens) {
      const fullUrl = `http://localhost:3000${screen.url}`;
      const filename = `${role}_${screen.name.replace(/\s+/g, '')}.png`;
      const filepath = path.join(screenshotsDir, filename);

      let attempts = 0;
      let success = false;
      while (attempts < 3 && !success) {
          attempts++;
          console.log(`  Navigating to ${screen.name} (${fullUrl}) [Attempt ${attempts}]...`);
          try {
            // Changed from networkidle to domcontentloaded + delay
            await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
            console.log('    DOM Content Loaded. Waiting for rendering...');
            await page.waitForTimeout(5000); // Wait 5s for data/animations

            await page.screenshot({ path: filepath, fullPage: true });
            console.log(`  Saved ${filename}`);
            success = true;
          } catch (error) {
            console.error(`  Failed to capture ${screen.name}: ${error.message}`);
            if (attempts < 3) {
                console.log("  Retrying in 5 seconds...");
                await page.waitForTimeout(5000);
            }
          }
      }
    }
  }

  await browser.close();
  console.log('Done!');
})();
