import sequelize from './database.js';
import ParentStore from './models/ParentStore.js';
import Store from './models/Store.js';
import Sale from './models/Sale.js';
import Product from './models/Product.js';
import SaleLine from './models/SaleLine.js';
import Stock from './models/Stock.js';
import Warehouse from './models/Warehouse.js';
import ParentStoreService from './services/ParentStoreService.js';

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

    async createProduct(name, stockQuantity, categoryName) {
        try {
            const product = await Product.create({
                name: name,
                stockQuantity: stockQuantity,
                categoryName: categoryName
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
                date: new Date()
            });
            return sale;
        } catch (error) {
            console.error('Error creating sale:', error);
            throw error;
        }
    },

    async createSaleLine(saleId, productId, quantity, price) {
        try {
            const saleLine = await SaleLine.create({
                SaleId: saleId,
                ProductId: productId,
                quantity: quantity,
                price: price,
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
        await this.createParentStore('Parent Store 1', '123 Main St')

        await this.createStore('Store 1', '1 Elm St', 1);
        await this.createStore('Store 2', '2 Elm St', 1);
        await this.createStore('Store 3', '3 Elm St', 1);
        await this.createStore('Store 4', '4 Elm St', 1);
        await this.createStore('Store 5', '5 Elm St', 1);

        await this.createWarehouse('Warehouse 1', 'Warehouse St', 1);

        await this.createProduct('Product 1', 10.99, 100, 'Category A');
        await this.createProduct('Product 2', 15.49, 50, 'Category B');
        await this.createProduct('Product 3', 7.99, 200, 'Category A');
        await this.createProduct('Product 4', 20.00, 30, 'Category C');
        await this.createProduct('Product 5', 5.49, 150, 'Category B');

        await this.createSale(1, 100.00);

        await this.createSaleLine(1, 1, 50, 10.99);
        await this.createSaleLine(1, 2, 299, 15.49);
        await this.createSaleLine(1, 3, 3, 7.99);

        await this.createStockStore(1, 1, 50);
        await this.createStockStore(2, 1, 30);
        await this.createStockStore(3, 2, 20);
        await this.createStockStore(4, 2, 10);
        await this.createStockStore(5, 3, 100);

        await this.createStockWarehouse(1, 1, 200);
        await this.createStockWarehouse(2, 1, 150);
        await this.createStockWarehouse(3, 1, 100);
        await this.createStockWarehouse(4, 1, 50);
        await this.createStockWarehouse(5, 1, 0);
    }
}

export default CreateFakeData;