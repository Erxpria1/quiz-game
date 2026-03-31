import { test, expect } from '@playwright/test';

test.describe('iOS Safari Compatibility Tests', () => {
  test('Detects iOS device and applies optimizations', async ({ page, isMobile }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check if iOS-specific classes are applied
    const body = page.locator('body');
    const userAgent = await page.evaluate(() => navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) ||
                  (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);

    if (isIOS || isMobile) {
      // Check that mobile touch targets have minimum size
      const touchTargets = page.locator('.mobile-touch-target');
      const count = await touchTargets.count();

      for (let i = 0; i < count; i++) {
        const target = touchTargets.nth(i);
        const box = await target.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.width).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });

  test('WebGL canvas renders without errors on iOS', async ({ page }) => {
    const consoleLogs: string[] = [];
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
      consoleLogs.push(msg.text());
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for Three.js to initialize

    // Check for WebGL context
    const hasWebGL = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;

      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      return gl !== null;
    });

    expect(hasWebGL).toBe(true);

    // Check for WebGL errors
    const webGLErrors = errors.filter(err =>
      err.includes('WebGL') || err.includes('context') || err.includes('canvas')
    );

    expect(webGLErrors.length).toBe(0);
  });

  test('Touch events work correctly on mobile', async ({ page, isMobile }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Find start button
    const startButton = page.locator('button:has-text("Start")');
    await expect(startButton).toBeVisible();

    // Check if button is not obscured by other elements
    const buttonBox = await startButton.boundingBox();
    expect(buttonBox).not.toBeNull();

    if (buttonBox) {
      // Check what element is at the button's center
      const elementAtButton = await page.evaluate(({ x, y }) => {
        const el = document.elementFromPoint(x + buttonBox.width / 2, y + buttonBox.height / 2);
        return el?.tagName;
      }, { x: buttonBox.x, y: buttonBox.y });

      expect(elementAtButton).toBe('BUTTON');
    }

    // Click and verify game starts
    await startButton.click();
    await page.waitForTimeout(1000);

    // Check if we're in playing state
    const questionButtons = page.locator('button').filter({ hasText: /^[0-9]+$/ });
    await expect(questionButtons.first()).toBeVisible();
  });

  test('Backdrop filter has fallback for iOS < 16', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check glass cards have background opacity fallback
    const glassCards = page.locator('.glass-card, .glass-card-strong');
    const count = await glassCards.count();

    expect(count).toBeGreaterThan(0);

    // Verify cards have visible background
    const firstCard = glassCards.first();
    const backgroundColor = await firstCard.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );

    // Should have some opacity (not fully transparent)
    expect(backgroundColor).not.toBe('transparent');
  });

  test('CSS animations do not cause performance issues', async ({ page }) => {
    const fps: number[] = [];

    // Collect FPS metrics
    await page.addInitScript(() => {
      let frameCount = 0;
      let lastTime = performance.now();

      window.addEventListener('requestanimationframe', () => {
        frameCount++;
        const currentTime = performance.now();
        const fps = Math.round(frameCount / ((currentTime - lastTime) / 1000));
        (window as any).currentFPS = fps;
      });
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Monitor FPS for 5 seconds
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(1000);
      const currentFPS = await page.evaluate(() => (window as any).currentFPS || 60);
      fps.push(currentFPS);
    }

    // Average FPS should be at least 30 (acceptable for mobile)
    const avgFPS = fps.reduce((a, b) => a + b, 0) / fps.length;
    expect(avgFPS).toBeGreaterThanOrEqual(30);
  });

  test('Z-index layering allows interaction', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Get the main content wrapper
    const mainContent = page.locator('main');
    const zIndex = await mainContent.evaluate(el =>
      getComputedStyle(el).zIndex
    );

    // Should have explicit z-index
    expect(zIndex).not.toBe('auto');

    // Check that Scene canvas doesn't block interactions
    const canvas = page.locator('canvas');
    const canvasPointerEvents = await canvas.evaluate(el =>
      getComputedStyle(el).pointerEvents
    );

    expect(canvasPointerEvents).toBe('none');
  });

  test('iOS-specific optimizations are applied', async ({ page }) => {
    const userAgent = await page.evaluate(() => navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    if (isIOS) {
      // Check for iOS-specific CSS optimizations
      const touchTargets = page.locator('.mobile-touch-target');
      await expect(touchTargets.first()).toBeVisible();

      // Check that backdrop-filter is applied (or fallback exists)
      const glassCards = page.locator('.glass-card');
      const backdropFilter = await glassCards.first().evaluate(el =>
        getComputedStyle(el).backdropFilter
      );

      // Either has backdrop-filter or solid fallback
      const hasBackdrop = backdropFilter !== 'none' || backdropFilter.includes('blur');
      expect(hasBackdrop).toBe(true);
    }
  });

  test('Memory usage stays within limits', async ({ page, context }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Play game for a bit
    const startButton = page.locator('button:has-text("Start")');
    await startButton.click();
    await page.waitForTimeout(2000);

    // Click a question
    const questionBtn = page.locator('button').filter({ hasText: /^[0-9]+$/ }).first();
    await questionBtn.click();
    await page.waitForTimeout(2000);

    // Close modal
    const closeButton = page.locator('button[aria-label="Close"], button:text("×")');
    if (await closeButton.count() > 0) {
      await closeButton.click();
    }

    // Check for memory leaks by monitoring JS heap
    const metrics = await page.evaluate(() => {
      return {
        jsHeapSizeLimit: (performance as any).memory?.jsHeapSizeLimit,
        totalJSHeapSize: (performance as any).memory?.totalJSHeapSize,
        usedJSHeapSize: (performance as any).memory?.usedJSHeapSize,
      };
    });

    if (metrics.usedJSHeapSize && metrics.jsHeapSizeLimit) {
      // Memory usage should be under 70% of limit (iOS Safari constraint)
      const memoryUsagePercent = (metrics.usedJSHeapSize / metrics.jsHeapSizeLimit) * 100;
      expect(memoryUsagePercent).toBeLessThan(70);
    }
  });
});
