import StockService from "../src/services/StockService.js";
import Stock from "../src/models/Stock.js";
import Product from "../src/models/Product.js";
import { jest, expect } from "@jest/globals";

describe("StockService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("getStockById should return stock with product", async () => {
        const mockStock = {
            id: 1,
            quantity: 10,
            Product: { name: "Product A" }
        };

        Stock.findByPk = jest.fn().mockResolvedValue(mockStock);

        const result = await StockService.getStockById(1);

        expect(Stock.findByPk).toHaveBeenCalledWith(1, {
            include: [Product]
        });
        expect(result).toEqual(mockStock);
    });

    it("getStockById should throw an error if stock not found", async () => {
        Stock.findByPk = jest.fn().mockResolvedValue(null);

        await expect(StockService.getStockById(999)).rejects.toThrow('Stock not found');
        expect(Stock.findByPk).toHaveBeenCalledWith(999, {
            include: [Product]
        });
    });

    it("getStocksByStoreId should return stocks for the store", async () => {
        const mockStocks = [
            {
                id: 1,
                StoreId: 1,
                quantity: 5,
                Product: { name: "Product A" }
            },
            {
                id: 2,
                StoreId: 1,
                quantity: 8,
                Product: { name: "Product B" }
            }
        ];

        Stock.findAll = jest.fn().mockResolvedValue(mockStocks);

        const result = await StockService.getStocksByStoreId(1);

        expect(Stock.findAll).toHaveBeenCalledWith({
            where: { StoreId: 1 },
            include: [Product]
        });
        expect(result).toEqual(mockStocks);
    });

    it("getStocksByStoreId should return empty array if no stocks found", async () => {
        Stock.findAll = jest.fn().mockResolvedValue([]);

        const result = await StockService.getStocksByStoreId(999);

        expect(Stock.findAll).toHaveBeenCalledWith({
            where: { StoreId: 999 },
            include: [Product]
        });

        expect(result).toEqual([]);
    });
});
