import { test } from '@playwright/test';

test('Start button is clickable', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Find the start button
  const startButton = page.locator('button:has-text("Start")');
  const buttonCount = await startButton.count();
  console.log('Start button count:', buttonCount);
  
  if (buttonCount > 0) {
    // Check button position and size
    const buttonBox = await startButton.boundingBox();
    console.log('Start button box:', buttonBox);
    
    // Check if button is visible
    const isVisible = await startButton.isVisible();
    console.log('Is visible:', isVisible);
    
    // Check if button is enabled
    const isEnabled = await startButton.isEnabled();
    console.log('Is enabled:', isEnabled);
    
    // Check what elements are on top
    const allButtons = page.locator('button');
    const allButtonCount = await allButtons.count();
    console.log('All buttons count:', allButtonCount);
    
    // Get all interactive elements at button location
    if (buttonBox) {
      const elementsAtPoint = await page.evaluate(({ x, y }) => {
        const el = document.elementFromPoint(x + 100, y + 20);
        if (el) {
          return {
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            textContent: el.textContent?.substring(0, 50),
            style: {
              position: el.style.position,
              zIndex: el.style.zIndex,
              pointerEvents: el.style.pointerEvents
            }
          };
        }
        return null;
      }, { x: buttonBox.x, y: buttonBox.y });
      console.log('Element at button location:', elementsAtPoint);
    }
    
    // Try to click
    await startButton.click();
    console.log('Clicked successfully!');
    
    // Wait a bit and check if game started
    await page.waitForTimeout(2000);
    
    // Check if we're now in playing state
    const questionButtons = page.locator('button').filter({ hasText: /^[0-9]+$/ });
    const questionCount = await questionButtons.count();
    console.log('Question buttons count:', questionCount);
    
    // Get page content to debug
    const pageContent = await page.content();
    const hasPickQuestion = pageContent.includes('Pick a Question');
    const hasScore = pageContent.includes('Score');
    console.log('Has "Pick a Question":', hasPickQuestion);
    console.log('Has "Score":', hasScore);
    
    await page.screenshot({ path: '/tmp/quiz-after-start.png', fullPage: true });
  }
  
  await page.screenshot({ path: '/tmp/quiz-start.png', fullPage: true });
});
