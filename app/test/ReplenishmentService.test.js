import ReplenishmentService from "../src/services/ReplenishmentService.js";
import Replenishment from "../src/models/Replenishment.js";
import sequelize from "../src/database.js";
import { jest, expect } from "@jest/globals";

describe("ReplenishmentService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("createReplenishment should create a new replenishment successfully", async () => {
        const mockCreate = jest.fn().mockResolvedValue({
            id: 1,
            StockId: 10,
            requestedQuantity: 50,
            status: 'pending'
        });

        const mockCommit = jest.fn();
        const mockRollback = jest.fn();
        sequelize.transaction = jest.fn().mockResolvedValue({
            commit: mockCommit,
            rollback: mockRollback
        });

        Replenishment.create = mockCreate;

        const result = await ReplenishmentService.createReplenishment(10, 50);

        expect(sequelize.transaction).toHaveBeenCalled();
        expect(mockCreate).toHaveBeenCalledWith({
            StockId: 10,
            requestedQuantity: 50,
            status: 'pending'
        }, { transaction: expect.any(Object) });
        expect(mockCommit).toHaveBeenCalled();
        expect(result).toEqual({
            id: 1,
            StockId: 10,
            requestedQuantity: 50,
            status: 'pending'
        });
    });

    it("updateReplenishmentStatus should update the status successfully", async () => {
        const mockSave = jest.fn().mockResolvedValue();
        const mockReplenishment = {
            id: 1,
            StockId: 10,
            requestedQuantity: 50,
            status: 'pending',
            save: mockSave
        };

        Replenishment.findByPk = jest.fn().mockResolvedValue(mockReplenishment);

        const result = await ReplenishmentService.updateReplenishmentStatus(1, 'received');

        expect(Replenishment.findByPk).toHaveBeenCalledWith(1);
        expect(mockSave).toHaveBeenCalled();
        expect(result.status).toBe('received');
    });

    it("updateReplenishmentStatus should throw an error if replenishment not found", async () => {
        Replenishment.findByPk = jest.fn().mockResolvedValue(null);

        await expect(
            ReplenishmentService.updateReplenishmentStatus(999, 'received')
        ).rejects.toThrow('Replenishment not found');

        expect(Replenishment.findByPk).toHaveBeenCalledWith(999);
    });
});
