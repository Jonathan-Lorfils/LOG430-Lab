import StoreService from "../src/services/StoreService.js";
import Store from "../src/models/Store.js";
import Sale from "../src/models/Sale.js";
import SaleLine from "../src/models/SaleLine.js";
import Product from "../src/models/Product.js";
import sequelize from "../src/database.js";
import { jest, expect } from "@jest/globals";

describe("StoreService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("getStoreDetailsByStoreId should return store with nested sales and products", async () => {
        const mockStore = {
            id: 1,
            name: "Store A",
            Sales: [
                {
                    id: 1,
                    SaleLines: [
                        {
                            Product: { name: "Product A" },
                            quantity: 2
                        }
                    ]
                }
            ]
        };

        Store.findOne = jest.fn().mockResolvedValue(mockStore);

        const result = await StoreService.getStoreDetailsByStoreId(1);

        expect(Store.findOne).toHaveBeenCalledWith({
            where: { id: 1 },
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

        expect(result).toEqual(mockStore);
    });

    it("getStoreDetailsByStoreId should throw error if store not found", async () => {
        Store.findOne = jest.fn().mockResolvedValue(null);

        await expect(StoreService.getStoreDetailsByStoreId(999)).rejects.toThrow("Store not found");
    });

    it("getMostSoldProductsByStoreId should return most sold products", async () => {
        const mockStore = {
            id: 1,
            Sales: [
                {
                    SaleLines: [
                        { Product: { name: "Product A" }, quantity: 3 },
                        { Product: { name: "Product B" }, quantity: 1 }
                    ]
                },
                {
                    SaleLines: [
                        { Product: { name: "Product A" }, quantity: 2 }
                    ]
                }
            ]
        };

        Store.findByPk = jest.fn().mockResolvedValue(mockStore);

        const result = await StoreService.getMostSoldProductsByStoreId(1);

        expect(Store.findByPk).toHaveBeenCalledWith(1, {
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

        expect(result).toEqual([
            { name: "Product A", quantity: 5 },
            { name: "Product B", quantity: 1 }
        ]);
    });

    it("getMostSoldProductsByStoreId should throw error if store not found", async () => {
        Store.findByPk = jest.fn().mockResolvedValue(null);

        await expect(StoreService.getMostSoldProductsByStoreId(999)).rejects.toThrow("Store not found");
    });
});
