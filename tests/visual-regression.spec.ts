import { test, expect } from '@playwright/test';

test.describe('Visual Regression & Layout Stability Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Emulate reduced motion to stabilize Framer Motion animations
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Navigate to portfolio
    await page.goto('/portfolio/');
    await page.waitForLoadState('networkidle');

    // Inject CSS to disable CSS transitions and animations for deterministic snapshotting
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  });

  test('Page has zero horizontal layout overflow', async ({ page }) => {
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('Capture full-page snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('full-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('Verify navigation landmark and responsive drawer', async ({ page, isMobile }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    if (isMobile) {
      const menuButton = page.locator('button[aria-label="Toggle navigation menu"]');
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      const mobileDrawer = page.locator('div[role="dialog"][aria-label="Mobile Navigation Menu"]');
      await expect(mobileDrawer).toBeVisible();
      await page.keyboard.press('Escape');
    }
  });

  test('Verify Project Detail Modal interaction and layout stability', async ({ page }) => {
    const firstProject = page.locator('#projects article button').first();
    if (await firstProject.isVisible()) {
      await firstProject.click();
      const modal = page.locator('div[role="dialog"]');
      await expect(modal).toBeVisible();

      // Check modal has no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Close modal
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('Verify key semantic landmarks', async ({ page }) => {
    await expect(page.locator('#top')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#resume-center')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

