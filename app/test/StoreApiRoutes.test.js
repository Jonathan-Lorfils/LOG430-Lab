import request from 'supertest';
import app from '../src/app.js';
import StoreApiController from '../src/api/controllers/StoreApiController.js';
import { jest, expect } from "@jest/globals";


jest.mock('../src/api/controllers/StoreApiController.js');

const VALID_TOKEN = 'token-static-123';

describe('GET /api/v1/stores/details/:storeid', () => {
    it('should call StoreController.getStoreDetails when route is hit', async () => {
        const storeId = 1;

        const mockHandler = jest.fn((req, res) =>
            res.status(200).json({
                success: true,
                data: {
                    store: {},
                    sales: [],
                    stocks: [],
                    mostSoldProducts: []
                }
            })
        );

        StoreApiController.getStoreDetails.mockImplementation(mockHandler);

        const response = await request(app)
            .get(`/api/v1/stores/details/${storeId}`)
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(mockHandler).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);
    });
});
