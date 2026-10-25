// Case study screenshots open full size in a lightbox that keyboard and screen reader users can use.
import { test, expect } from '@playwright/test';

test('lightbox opens, shows the whole image, traps focus and closes', async ({ page, isMobile }) => {
  await page.goto('/work/websites/mintage');
  const trigger = page.getByRole('button', { name: /Enlarge image: .*mobile/ });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const box = page.getByRole('dialog', { name: /mobile/ });
  await expect(box).toBeVisible();
  const close = box.getByRole('button', { name: 'Close' });
  await expect(close).toBeFocused();

  // The tall phone screenshot must not be cropped: the image shows at its own aspect ratio.
  const img = box.locator('img');
  await expect(img).toHaveJSProperty('complete', true);
  const { fit, ratio, natural } = await img.evaluate((i: HTMLImageElement) => ({ fit: getComputedStyle(i).objectFit, ratio: i.clientWidth / i.clientHeight, natural: i.naturalWidth / i.naturalHeight }));
  expect(fit === 'contain' || Math.abs(ratio - natural) < 0.02, 'image not cropped').toBe(true);

  if (!isMobile) {
    await page.keyboard.press('Tab');
    await expect(close, 'focus stays in the dialog').toBeFocused();
  }
  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();
  await expect(trigger).toBeFocused();
});
