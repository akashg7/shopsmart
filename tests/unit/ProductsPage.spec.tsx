import { test, expect } from '@playwright/experimental-ct-react';
import ProductsPage from '../../client/src/pages/ProductsPage';

test('should render page title and search bar', async ({ mount }) => {
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
