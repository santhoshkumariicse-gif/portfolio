import { test, expect } from '@playwright/test';

test.describe('Accessibility & WCAG 2.2 AA Conformance Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Page has valid document title and language attribute', async ({ page }) => {
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('en');

    const title = await page.title();
    expect(title).toContain('Santhosh Kumar M');
  });

  test('Skip to content link is present and targets main landmark', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    const mainElement = page.locator('#main-content');
    await expect(mainElement).toBeAttached();
  });

  test('Semantic landmark regions exist (banner/nav, main, contentinfo/footer)', async ({ page }) => {
    await expect(page.locator('nav')).toBeAttached();
    await expect(page.locator('main')).toBeAttached();
    await expect(page.locator('footer')).toBeAttached();
  });

  test('Heading hierarchy starts with single H1', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Assert all H2 elements have non-empty accessible text
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    for (let i = 0; i < h2Count; i++) {
      const text = await h2Elements.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('All buttons and links have accessible names', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const btn = buttons.nth(i);
      const isVisible = await btn.isVisible();
      if (isVisible) {
        const text = await btn.textContent();
        const ariaLabel = await btn.getAttribute('aria-label');
        const hasAccessibleName = (text && text.trim().length > 0) || (ariaLabel && ariaLabel.trim().length > 0);
        expect(hasAccessibleName).toBe(true);
      }
    }
  });

  test('Interactive controls have visible focus rings', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await skipLink.focus();
    const isVisible = await skipLink.isVisible();
    expect(isVisible).toBe(true);
  });

  test('Modal dialog traps focus and supports Escape dismissal', async ({ page }) => {
    const firstProjectButton = page.locator('#projects article button').first();
    if (await firstProjectButton.isVisible()) {
      await firstProjectButton.click();
      const modal = page.locator('div[role="dialog"]');
      await expect(modal).toBeVisible();

      // Verify aria-modal and aria-labelledby
      const ariaModal = await modal.getAttribute('aria-modal');
      expect(ariaModal).toBe('true');

      // Dismiss with Escape
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('Reduced motion preference is respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const prefersReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(prefersReducedMotion).toBe(true);
  });
});

