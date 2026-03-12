import { test, expect } from '@playwright/test';

test.describe('ChatFile App', () => {
  test('should display upload area on initial load', async ({ page }) => {
    await page.goto('/');

    // Check header
    await expect(page.getByText('ChatFile')).toBeVisible();

    // Check upload area
    await expect(page.getByText(/拖拽 PDF 文件到此处/)).toBeVisible();
    await expect(page.getByText(/支持 PDF 格式/)).toBeVisible();
  });

  test('should show document name placeholder when no document', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('暂未加载文档')).toBeVisible();
  });
});
