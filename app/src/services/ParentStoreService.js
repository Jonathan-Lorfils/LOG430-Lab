import sequelize from '../database.js';
import Store from '../models/Store.js';
import Sale from '../models/Sale.js';
import SaleLine from '../models/SaleLine.js';
import Product from '../models/Product.js';
import Warehouse from '../models/Warehouse.js';
import Stock from '../models/Stock.js';
import ParentStore from '../models/ParentStore.js'
import logger from '../utils/logger.js';


const ParentStoreService = {
    async getAllStores() {
        try {
            const stores = await Store.findAll();
            return stores;
        } catch (error) {
            console.error('Error fetching stores:', error);
            throw error;
        }
    },

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

    async getAllStoreRevenue() {
        try {
            const stores = await Store.findAll({
                where: { ParentStoreId: 1 },
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
            logger.error('Error fetching store revenue:', error);
            throw error;
        }
    },

    async getAllStocksEmptyQuantityByParentStoreId() {
        try {
            const stores = await Store.findAll({
                where: { ParentStoreId: 1 },
                include: [{
                    model: Stock,
                    where: { quantity: 0 },
                    include: [Product]
                }]
            });

            const emptyStocks = stores.flatMap(store =>
                store.Stocks.map(stock => ({
                    storeName: store.name,
                    productName: stock.Product.name,
                    quantity: stock.quantity
                }))
            );

            return emptyStocks;
        } catch (error) {
            logger.error('Error fetching out of stock products:', error);
            throw error;
        }
    },

    async getStoresMostSoldProductsByParentStoreId() {
        try {
            const stores = await Store.findAll({
                where: { ParentStoreId: 1 },
                include: [{
                    model: Sale,
                    include: [{
                        model: SaleLine,
                        include: [Product]
                    }]
                }]
            });

            const mostSoldProducts = stores.map(store => {
                const productSales = store.Sales.flatMap(sale =>
                    sale.SaleLines.map(saleLine => ({
                        productName: saleLine.Product.name,
                        quantity: saleLine.quantity
                    }))
                );

                const productSalesCount = productSales.reduce((acc, sale) => {
                    acc[sale.productName] = (acc[sale.productName] || 0) + sale.quantity;
                    return acc;
                }, {});

                const sortedProducts = Object.entries(productSalesCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);

                return { storeName: store.name, mostSoldProducts: sortedProducts };
            });

            return mostSoldProducts;
        } catch (error) {
            logger.error('Error fetching trendy products:', error);
            throw error;
        }
    }
}

export default ParentStoreService;