import { test, expect } from '@playwright/test';

test.describe('Search Flow End-to-End', () => {
  
  test('User can open homepage, see products, and search', async ({ page }) => {
    // 1. User opens homepage
    await page.goto('/');

    // 2. Products load
    await expect(page.locator('.products-header h1')).toHaveText('Our Products');
    
    const productGrid = page.locator('.products-grid');
    await expect(productGrid).toBeVisible();

    // Verify loading spinner goes away and cards emerge
    await expect(page.locator('.loading')).toHaveCount(0);
    const initialProductCards = page.locator('.product-card');
    await expect(initialProductCards.first()).toBeVisible();

    // 3. User searches product
    const searchInput = page.locator('input.search-input');
    await searchInput.fill('phone');
    await page.click('button.search-btn');

    // 4. Wait for search to populate
    await expect(page.locator('.loading')).toHaveCount(0);

    // Ensure we still have basic visible container element
    await expect(page.locator('.products-page')).toBeVisible();
    
    // 5. If products returned we should see product cards or a no results message
    const hasResults = await page.locator('.product-card').count() > 0;
    const noResultsMsg = await page.locator('.no-results').count() > 0;
    
    expect(hasResults || noResultsMsg).toBeTruthy();
  });

});
