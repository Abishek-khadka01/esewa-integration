import {faker} from "@faker-js/faker"
import {Item} from "../models/item.models"
// Define categories
const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys', 'Sports'];

// Function to create fake items
   export  async function createFakeItems(numItems) {
    const items = [];
    for (let i = 0; i < numItems; i++) {
        const item =  Item.create({
            name: faker.commerce.productName(), // Generates a random product name
            price: parseFloat(faker.commerce.price()), // Generates a random price
            category: categories[Math.floor(Math.random() * categories.length)] // Randomly selects a category
        });
        items.push(item);
    }
    await Promise.all(items)
    
    process.exit(0)
}



