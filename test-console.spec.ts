import { test } from '@playwright/test';

test('Check console errors', async ({ page }) => {
  const consoleLogs: string[] = [];
  const errorLogs: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errorLogs.push(`ERROR: ${msg.text()}`);
    } else {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  
  page.on('pageerror', error => {
    errorLogs.push(`PAGE ERROR: ${error.message}`);
  });
  
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Wait for Three.js to render
  
  console.log('=== CONSOLE LOGS ===');
  consoleLogs.forEach(log => console.log(log));
  
  console.log('\n=== ERROR LOGS ===');
  errorLogs.forEach(log => console.log(log));
  
  // Check if canvas is actually rendering
  const canvas = page.locator('canvas');
  const canvasCount = await canvas.count();
  console.log(`\nCanvas count: ${canvasCount}`);
  
  if (canvasCount > 0) {
    // Check canvas dimensions and style
    const canvasInfo = await canvas.evaluate(el => ({
      width: el.width,
      height: el.height,
      offsetWidth: el.offsetWidth,
      offsetHeight: el.offsetHeight,
      style: {
        width: el.style.width,
        height: el.style.height,
        display: el.style.display,
        visibility: el.style.visibility,
        opacity: el.style.opacity
      }
    }));
    console.log('Canvas info:', JSON.stringify(canvasInfo, null, 2));
    
    // Check if canvas has any children (WebGL context)
    const hasWebGL = await canvas.evaluate(el => {
      const gl = el.getContext('webgl') || el.getContext('webgl2');
      return gl !== null;
    });
    console.log('Has WebGL context:', hasWebGL);
  }
  
  // Check the parent container of Scene component
  const sceneContainer = page.locator('[style*="position: fixed"]');
  const sceneCount = await sceneContainer.count();
  console.log('Fixed position containers:', sceneCount);
  
  if (sceneCount > 0) {
    const sceneStyle = await sceneContainer.first().evaluate(el => ({
      style: el.getAttribute('style'),
      innerHTML: el.innerHTML.substring(0, 200)
    }));
    console.log('Scene container:', JSON.stringify(sceneStyle, null, 2));
  }
  
  await page.screenshot({ path: '/tmp/quiz-debug.png', fullPage: true });
});
