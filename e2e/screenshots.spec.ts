import { test, expect } from '@playwright/test';

test.describe('功能截图验证', () => {
  test('截图1：初始页面-上传区域', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 验证关键元素存在
    await expect(page.getByText('ChatFile')).toBeVisible();
    await expect(page.getByText(/拖拽 PDF 文件到此处/)).toBeVisible();

    // 截图
    await page.screenshot({ path: 'docs/screenshots/01-initial-page.png', fullPage: true });
  });

  test('截图2：Header组件显示', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header, [role="banner"]').first();
    await expect(header).toBeVisible();

    // 截图Header区域
    await header.screenshot({ path: 'docs/screenshots/02-header.png' });
  });

  test('截图3：上传区域详细视图', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const uploadArea = page.locator('text=拖拽 PDF 文件到此处').locator('..');
    await expect(uploadArea).toBeVisible();

    // 截图上传区域
    await uploadArea.screenshot({ path: 'docs/screenshots/03-upload-area.png' });
  });
});
