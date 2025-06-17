import request from 'supertest';
import app from '../src/app.js';
import ReplenishmentApiController from '../src/api/controllers/ReplenishmentApiController.js';
import { jest, expect } from "@jest/globals";


jest.mock('../src/api/controllers/ReplenishmentApiController.js');

const VALID_TOKEN = 'token-static-123';

describe('POST /api/v1/replenishments/create/:stockid/:quantity', () => {
    it('should call ReplenishmentApiController.createRepleplenishment when route is hit', async () => {
        const stockId = 1;
        const quantity = 10;

        const mockHandler = jest.fn((req, res) =>
            res.status(201).json({
                success: true,
                message: 'Réapprovisionnement créé avec succès',
                data: {
                    id: 123,
                    StockId: stockId,
                    requestedQuantity: quantity
                }
            })
        );

        ReplenishmentApiController.createRepleplenishment.mockImplementation(mockHandler);

        const res = await request(app)
            .post(`/api/v1/replenishments/create/${stockId}/${quantity}`)
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.statusCode).toBe(201);
    });
});
