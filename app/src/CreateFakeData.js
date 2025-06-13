import ParentStore from './models/ParentStore.js';
import Store from './models/Store.js';
import Sale from './models/Sale.js';
import Product from './models/Product.js';
import SaleLine from './models/SaleLine.js';
import Stock from './models/Stock.js';
import Warehouse from './models/Warehouse.js';
import Category from './models/Category.js';
import { faker } from '@faker-js/faker';

const CreateFakeData = {
    async createParentStore(name, address) {
        try {
            const parentStore = await ParentStore.create({
                name: name,
                address: address
            });
            return parentStore;
        } catch (error) {
            console.error('Error creating parent store:', error);
            throw error;
        }
    },
    async createStore(name, address, parentStoreId) {
        try {
            const store = await Store.create({
                name: name,
                address: address,
                ParentStoreId: parentStoreId
            });
            return store;
        } catch (error) {
            console.error('Error creating store:', error);
            throw error;
        }
    },
    async createWarehouse(name, address, parentStoreId) {
        try {
            const warehouse = await Warehouse.create({
                name: name,
                address: address,
                ParentStoreId: parentStoreId
            });
            return warehouse;
        } catch (error) {
            console.error('Error creating warehouse:', error);
            throw error;
        }
    },

    async createProduct(name, stockQuantity, categoryName, price, description) {
        try {
            const category = await Category.findOrCreate({
                where: { name: categoryName },
                defaults: { name: categoryName }
            });
            if (!category || !category[0]) {
                throw new Error('Category creation failed');
            }
            const product = await Product.create({
                name: name,
                stockQuantity: stockQuantity,
                CategoryId: category[0].id,
                price: price || 0.00,
                description: description || ''
            });
            return product;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    async createSale(storeId, subTotal) {
        try {
            const sale = await Sale.create({
                StoreId: storeId,
                subTotal: subTotal,
            });
            return sale;
        } catch (error) {
            console.error('Error creating sale:', error);
            throw error;
        }
    },

    async createSaleLine(saleId, productId, quantity) {
        try {
            const product = await Product.findByPk(productId);

            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            const saleLine = await SaleLine.create({
                SaleId: saleId,
                ProductId: productId,
                quantity: quantity,
                pricePerUnit: product.price,
            });
            return saleLine;
        } catch (error) {
            console.error('Error creating sale line:', error);
            throw error;
        }
    },

    async createStockStore(productId, storeId, quantity) {
        try {
            const stock = Stock.create({
                ProductId: productId,
                StoreId: storeId,
                quantity: quantity
            });
            return stock;
        } catch (error) {
            console.error('Error creating stock:', error);
            throw error;
        }
    },

    async createStockWarehouse(productId, warehouseId, quantity) {
        try {
            const stock = Stock.create({
                ProductId: productId,
                WarehouseId: warehouseId,
                quantity: quantity
            });
            return stock;
        } catch (error) {
            console.error('Error creating stock:', error);
            throw error;
        }
    },

    async generate() {
        const parentStore = await this.createParentStore('Parent Store 1', '123 Main St');

        const stores = [];
        for (let i = 1; i <= 5; i++) {
            const store = await this.createStore(`Store ${i}`, `${i} Elm St`, parentStore.id);
            stores.push(store);
        }

        const warehouse = await this.createWarehouse('Warehouse 1', 'Warehouse St', parentStore.id);

        const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
        const products = [];

        for (let i = 1; i <= 20; i++) {
            const name = `Product ${i}`;
            const stockQuantity = faker.number.int({ min: 10, max: 200 });
            const price = parseFloat(faker.commerce.price({ min: 5, max: 50 })).toFixed(2);
            const category = faker.helpers.arrayElement(categories);
            const description = faker.commerce.productDescription();

            const product = await this.createProduct(name, stockQuantity, category, price, description);
            products.push(product);

            await this.createStockWarehouse(product.id, warehouse.id, stockQuantity);

            const store = faker.helpers.arrayElement(stores);
            const quantityInStore = faker.number.int({ min: 1, max: 20 });
            await this.createStockStore(product.id, store.id, quantityInStore);
        }

        for (let i = 0; i < 50; i++) {
            const store = faker.helpers.arrayElement(stores);
            const sale = await this.createSale(store.id, 0);
            let subTotal = 0;

            const usedProductIds = new Set();

            const saleLinesCount = faker.number.int({ min: 1, max: 5 });
            for (let j = 0; j < saleLinesCount; j++) {
                let product;
                do {
                    product = faker.helpers.arrayElement(products);
                } while (usedProductIds.has(product.id));
                usedProductIds.add(product.id);

                const quantity = faker.number.int({ min: 1, max: 10 });

                await this.createSaleLine(sale.id, product.id, quantity);
                subTotal += product.price * quantity;
            }

            sale.subTotal = subTotal.toFixed(2);
            await sale.save();
        }
    }


}

export default CreateFakeData;