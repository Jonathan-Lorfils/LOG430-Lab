import sequelize from '../database.js';
import Store from '../models/Store.js';
import Sale from '../models/Sale.js';
import SaleLine from '../models/SaleLine.js';
import Product from '../models/Product.js';

const StoreService = {
    async getStoreDetailsByStoreId(storeId) {
        try {
            const store = await Store.findByPk(storeId, {
                include: [
                    {
                        model: Sale,
                        include: [
                            {
                                model: SaleLine,
                                include: [Product]
                            }
                        ]
                    }
                ]
            });

            if (!store) {
                throw new Error('Store not found');
            }

            return store;
        } catch (error) {
            console.error('Error fetching store details:', error);
            throw error;
        }
    },

    async getMostSoldProductsByStoreId(storeId) {
        try {
            const store = await Store.findByPk(storeId, {
                include: [
                    {
                        model: Sale,
                        include: [
                            {
                                model: SaleLine,
                                include: [Product]
                            }
                        ]
                    }
                ]
            });

            if (!store) {
                throw new Error('Store not found');
            }

            const productSales = {};

            store.Sales.forEach(sale => {
                sale.SaleLines.forEach(saleLine => {
                    const productName = saleLine.Product.name;
                    if (!productSales[productName]) {
                        productSales[productName] = 0;
                    }
                    productSales[productName] += saleLine.quantity;
                });
            });

            const products = Object.entries(productSales)
                .sort(([, a], [, b]) => b - a)
                .map(([name, quantity]) => ({ name, quantity }));

            return products;
        } catch (error) {
            console.error('Error fetching most sold products:', error);
            throw error;
        }
    },
}

export default StoreService;