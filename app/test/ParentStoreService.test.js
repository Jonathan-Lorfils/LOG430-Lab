import ParentStoreService from "../src/services/ParentStoreService.js";
import Store from "../src/models/Store.js";
import Sale from "../src/models/Sale.js";
import SaleLine from "../src/models/SaleLine.js";
import Product from "../src/models/Product.js";
import Warehouse from "../src/models/Warehouse.js";
import Stock from "../src/models/Stock.js";
import ParentStore from "../src/models/ParentStore.js";
import sequelize from "../src/database.js";
import { jest, expect } from "@jest/globals";

describe("ParentStoreService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("getAllStores should return all stores", async () => {
        const mockStores = [{ id: 1, name: "Store A" }, { id: 2, name: "Store B" }];
        Store.findAll = jest.fn().mockResolvedValue(mockStores);

        const result = await ParentStoreService.getAllStores();

        expect(Store.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockStores);
    });

    it("getAllStoreRevenue should return total revenue per store", async () => {
        const mockStores = [
            {
                name: "Store A",
                Sales: [{ subTotal: 100 }, { subTotal: 200 }]
            },
            {
                name: "Store B",
                Sales: []
            }
        ];

        Store.findAll = jest.fn().mockResolvedValue(mockStores);

        const result = await ParentStoreService.getAllStoreRevenue();

        expect(Store.findAll).toHaveBeenCalledWith({
            where: { ParentStoreId: 1 },
            include: [{ model: Sale, attributes: ["subTotal"] }]
        });

        expect(result).toEqual([
            { storeName: "Store A", totalRevenue: 300 },
            { storeName: "Store B", totalRevenue: 0 }
        ]);
    });


    it("getAllStocksEmptyQuantityByParentStoreId should return zero-stock products", async () => {
        const mockStores = [
            {
                name: "Store A",
                Stocks: [
                    { Product: { name: "Product A" }, quantity: 0 },
                    { Product: { name: "Product B" }, quantity: 0 }
                ]
            }
        ];

        Store.findAll = jest.fn().mockResolvedValue(mockStores);

        const result = await ParentStoreService.getAllStocksEmptyQuantityByParentStoreId();

        expect(Store.findAll).toHaveBeenCalledWith({
            where: { ParentStoreId: 1 },
            include: [{ model: Stock, where: { quantity: 0 }, include: [Product] }]
        });

        expect(result).toEqual([
            { storeName: "Store A", productName: "Product A", quantity: 0 },
            { storeName: "Store A", productName: "Product B", quantity: 0 }
        ]);
    });

    it("getStoresMostSoldProductsByParentStoreId should return most sold products", async () => {
        const mockStores = [
            {
                name: "Store A",
                Sales: [
                    {
                        SaleLines: [
                            { Product: { name: "Product A" }, quantity: 3 },
                            { Product: { name: "Product B" }, quantity: 5 }
                        ]
                    },
                    {
                        SaleLines: [
                            { Product: { name: "Product A" }, quantity: 2 }
                        ]
                    }
                ]
            }
        ];

        Store.findAll = jest.fn().mockResolvedValue(mockStores);

        const result = await ParentStoreService.getStoresMostSoldProductsByParentStoreId();

        expect(Store.findAll).toHaveBeenCalledWith({
            where: { ParentStoreId: 1 },
            include: [{
                model: Sale,
                include: [{ model: SaleLine, include: [Product] }]
            }]
        });

        expect(result).toEqual([
            {
                storeName: "Store A",
                mostSoldProducts: [["Product A", 5], ["Product B", 5]]
            }
        ]);
    });

    it("getWarehouseStockByParentStoreId should return warehouse stock", async () => {
        const mockWarehouse = {
            id: 1,
            name: "Main Warehouse",
            Stocks: [
                { Product: { name: "Product A" }, quantity: 10 },
                { Product: { name: "Product B" }, quantity: 5 }
            ]
        };

        Warehouse.findOne = jest.fn().mockResolvedValue(mockWarehouse);

        const result = await ParentStoreService.getWarehouseStockByParentStoreId(1);

        expect(Warehouse.findOne).toHaveBeenCalledWith({
            where: { ParentStoreId: 1 },
            include: [{ model: Stock, include: [Product] }]
        });

        expect(result).toEqual(mockWarehouse);
    });
});
