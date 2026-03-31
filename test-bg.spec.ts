import { test } from '@playwright/test';

test('Quiz game background is visible', async ({ page }) => {
  // Go to the quiz game
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check the body background
  const body = page.locator('body');
  const bodyBg = await body.evaluate(el => getComputedStyle(el).background);
  console.log('Body background:', bodyBg);
  
  // Check if canvas exists (Three.js)
  const canvas = page.locator('canvas');
  const canvasCount = await canvas.count();
  console.log('Canvas count:', canvasCount);
  
  if (canvasCount > 0) {
    const canvasBox = await canvas.first().boundingBox();
    console.log('Canvas size:', canvasBox);
    
    // Check canvas z-index
    const canvasStyle = await canvas.first().evaluate(el => {
      const style = getComputedStyle(el);
      return {
        zIndex: style.zIndex,
        position: style.position,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents
      };
    });
    console.log('Canvas style:', canvasStyle);
  }
  
  // Check if there are any overlay elements covering the canvas
  const overlays = page.locator('[class*="fixed"], [class*="absolute"]');
  const overlayCount = await overlays.count();
  console.log('Overlay count:', overlayCount);
  
  // Check the main container
  const mainContent = page.locator('.min-h-screen').first();
  const mainStyle = await mainContent.evaluate(el => {
    const style = getComputedStyle(el);
    return {
      zIndex: style.zIndex,
      position: style.position,
      background: style.background,
      backgroundColor: style.backgroundColor
    };
  });
  console.log('Main content style:', mainStyle);
  
  // Take a screenshot
  await page.screenshot({ path: '/tmp/quiz-test.png', fullPage: true });
  console.log('Screenshot saved to /tmp/quiz-test.png');
  
  // Click start button
  const startButton = page.locator('button:has-text("Start")');
  if (await startButton.count() > 0) {
    await startButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/quiz-playing.png', fullPage: true });
    console.log('Playing screenshot saved');
    
    // Click a question
    const questionBtn = page.locator('button').filter({ hasText: '1' }).first();
    if (await questionBtn.count() > 0) {
      await questionBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: '/tmp/quiz-question.png', fullPage: true });
      console.log('Question modal screenshot saved');
    }
  }
});
