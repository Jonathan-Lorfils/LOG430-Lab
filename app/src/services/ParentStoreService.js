import sequelize from '../database.js';
import Store from '../models/Store.js';
import Sale from '../models/Sale.js';
import SaleLine from '../models/SaleLine.js';
import Product from '../models/Product.js';
import Warehouse from '../models/Warehouse.js';
import Stock from '../models/Stock.js';

const ParentStoreService = {
    async getAllStoresSalesByParentStoreId(id) {
        try {
            const stores = await Store.findAll({
                where: { ParentStoreId: id },
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
            return stores;
        } catch (error) {
            console.error('Error fetching stores:', error);
            throw error;
        }

    },

    async getAllStoreStocksByParentStoreId(parentStoreId) {
        try {
            const stores = await Store.findAll({
                where: { ParentStoreId: parentStoreId },
                include: [{
                    model: Stock,
                    include: [Product]
                }]
            });

            if (!stores || stores.length === 0) {
                throw new Error('No stores found for the given Parent Store ID');
            }

            return stores;
        } catch (error) {
            console.error('Error fetching store stocks:', error);
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

            const sortedProducts = Object.entries(productSales)
                .sort(([, a], [, b]) => b - a)
                .map(([name, quantity]) => ({ name, quantity }));

            return sortedProducts;
        } catch (error) {
            console.error('Error fetching most sold products:', error);
            throw error;
        }
    },

    async getWarehouseStockByParentStoreId(parentStoreId) {
        try {
            const warehouse = await Warehouse.findOne({
                where: { ParentStoreId: parentStoreId },
                include: [{
                    model: Stock,
                    include: [Product]
                }]
            });

            if (!warehouse) {
                throw new Error('Warehouse not found for the given Parent Store ID');
            }
            return warehouse
        } catch (error) {
            console.error('Error fetching warehouse stocks:', error);
            throw error;
        }
    },

    async getAllStoreRevenueByParentStoreId(parentStoreId) {
        try {
            const stores = await Store.findAll({
                where: { ParentStoreId: parentStoreId },
                include: [{
                    model: Sale,
                    attributes: ['subTotal']
                }]
            });

            const revenueByStore = stores.map(store => {
                const totalRevenue = store.Sales.reduce((sum, sale) => sum + sale.subTotal, 0);
                return { storeName: store.name, totalRevenue };
            });

            return revenueByStore;
        } catch (error) {
            console.error('Error fetching store revenue:', error);
            throw error;
        }
    }
}

export default ParentStoreService;