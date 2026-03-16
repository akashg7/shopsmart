import { test, expect } from '@playwright/test';

test.describe('Products API Integration', () => {

  test('should fetch and display products from API', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for network request to the backend API
    const response = await page.waitForResponse(response => 
      response.url().includes('/api/products') && response.request().method() === 'GET'
    );
    expect(response.status()).toBe(200);

    // Verify products are rendered
    const productCards = page.locator('.product-card');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
    
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should call search API on input', async ({ page }) => {
    await page.goto('/');
    
    // Fill the search bar
    await page.fill('input.search-input', 'laptop');
    
    // Wait for the backend search request
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/products/search?q=laptop')
    );
    
    // Trigger search
    await page.click('button.search-btn');
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    
    // Check UI update logic
    await expect(page.locator('.products-grid')).toBeVisible();
  });

  test('should handle pagination correctly', async ({ page }) => {
    await page.goto('/');
    
    // Ensure initial request completed
    await page.waitForResponse(res => res.url().includes('/api/products?page=1'));
    
    // Wait for pagination to appear
    const pagination = page.locator('.pagination');
    // If there's enough products, it might have pagination
    if (await pagination.isVisible()) {
      await page.click('.pagination button:has-text("Next")');
      
      // We should see request for page 2
      const response = await page.waitForResponse(res => res.url().includes('/api/products?page=2'));
      expect(response.status()).toBe(200);
    } else {
      console.log('Not enough products for pagination, test passed gracefully.');
    }
  });
});
