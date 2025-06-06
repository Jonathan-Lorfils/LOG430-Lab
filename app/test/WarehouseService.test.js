import WarehouseService from "../src/services/WarehouseService.js";
import Warehouse from "../src/models/Warehouse.js";
import Stock from "../src/models/Stock.js";
import Product from "../src/models/Product.js";
import sequelize from "../src/database.js";
import { jest, expect } from "@jest/globals";

describe("WarehouseService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("getWarehouseStocks should return warehouse with stocks and products", async () => {
        const mockWarehouse = {
            id: 1,
            name: "Central Warehouse",
            Stocks: [
                { Product: { name: "Product A" }, quantity: 20 },
                { Product: { name: "Product B" }, quantity: 15 }
            ]
        };

        Warehouse.findOne = jest.fn().mockResolvedValue(mockWarehouse);

        const result = await WarehouseService.getWarehouseStocks();

        expect(Warehouse.findOne).toHaveBeenCalledWith({
            include: [{
                model: Stock,
                include: [{ model: Product }]
            }]
        });

        expect(result).toEqual(mockWarehouse);
    });

    it("getWarehouseStocks should throw an error if warehouse not found", async () => {
        Warehouse.findOne = jest.fn().mockResolvedValue(null);

        await expect(WarehouseService.getWarehouseStocks()).rejects.toThrow("Warehouse not found");
    });
});
