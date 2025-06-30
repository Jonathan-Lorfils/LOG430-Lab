import Category from "./models/Category.js";
import Product from "./models/Product.js";

const GenerateFakeData = {
    async createCategory(name) {
        try {
            const category = await Category.create({
                name: name,
            });
            return category;
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    async createProduct(name, price, description, categoryId) {
        try {
            const product = await Product.create({
                name: name,
                price: price,
                description: description,
                CategoryId: categoryId,
            });
            return product;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    async generate(productCount = 20, categoryCount = 10) {
        try {
            // Create categories
            const categories = [];
            for (let i = 0; i < categoryCount; i++) {
                const category = await this.createCategory(`Category ${i + 1}`);
                categories.push(category);
            }

            // Create products
            for (let i = 0; i < productCount; i++) {
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                await this.createProduct(
                    `Product ${i + 1}`,
                    (Math.random() * 100).toFixed(2),
                    `Description for Product ${i + 1}`,
                    randomCategory.id
                );
            }
        } catch (error) {
            console.error('Error generating fake data:', error);
        }
    }
};

export default GenerateFakeData;