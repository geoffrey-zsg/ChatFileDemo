import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: 'docs/screenshots/ui-optimized.png', fullPage: true });
await browser.close();
console.log('Screenshot saved to docs/screenshots/ui-optimized.png');
