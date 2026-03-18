import { test, expect } from '@playwright/experimental-ct-react';
import ProductsPage from '../../client/src/pages/ProductsPage';

test('should render page title and search bar', async ({ page, mount }) => {
  // Mock the API response so it stays in loading state or succeeds safely
  await page.route('**/api/products**', async route => {
    // delay response to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 500));
    await route.fulfill({ json: { products: [], total: 0 } });
  });

  const component = await mount(<ProductsPage />);
  
  // Verify basic structure
  await expect(component.locator('h1')).toContainText('Our Products');
  await expect(component.locator('input.search-input')).toBeVisible();
  await expect(component.locator('button.search-btn')).toBeVisible();
  
  // Verify loading state appears initially
  await expect(component.locator('.loading')).toBeVisible();
});

test('search input updates state', async ({ mount }) => {
  const component = await mount(<ProductsPage />);
  const searchInput = component.locator('input.search-input');
  
  await searchInput.fill('iphone');
  await expect(searchInput).toHaveValue('iphone');
});
