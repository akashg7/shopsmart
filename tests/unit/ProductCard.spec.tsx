import { test, expect } from '@playwright/experimental-ct-react';
import ProductCard from '../../client/src/components/ProductCard';

const dummyProduct = {
  _id: '1',
  title: 'Smartphone X',
  description: 'A great phone',
  price: 999,
  brand: 'TechBrand',
  thumbnail: 'https://dummyjson.com/image/1',
};

test('should render product information correctly', async ({ mount }) => {
  const component = await mount(<ProductCard product={dummyProduct} />);
  
  await expect(component.locator('h3')).toContainText('Smartphone X');
  await expect(component.locator('.product-price')).toContainText('$999');
  await expect(component.locator('.product-brand')).toContainText('TechBrand');
});
