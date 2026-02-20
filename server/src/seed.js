require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();

        console.log('Fetching data from dummyjson...');
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        const products = data.products;

        console.log(`Fetched ${products.length} products.`);

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        // Insert new products
        await Product.insertMany(products);
        console.log('Data seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
