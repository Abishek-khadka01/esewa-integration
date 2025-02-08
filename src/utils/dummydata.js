import axios from "axios";
import { Item } from "../models/item.models.js";

export const createFakeItemsData = async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const items = response.data; 

        const promiseItems = items.map(({ title, price, description, category, image, rating }) => {
            return Item.create({
                name: title,
                price,
                description,
                category,
                image,
                rating: {
                    rate: rating.rate,
                    count: rating.count
                }
            });
        });

        await Promise.all(promiseItems);

        console.log("Items are generated");
    } catch (error) {
        console.error("Error generating items:", error);
    } finally {
        process.exit(0);
    }
};