import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/database.js';
import ParentStoreApiController from '../src/api/controllers/ParentStoreApiController.js';
import { jest, expect } from "@jest/globals";

jest.mock('../src/api/controllers/ParentStoreApiController.js');

const VALID_TOKEN = 'token-static-123';

afterEach(() => {
    jest.restoreAllMocks();
});

afterAll(async () => {
    await sequelize.close();
});

describe('GET /api/v1/parentStore/salesStats', () => {
    it('should call ParentStoreApiController.getSalesStats when route is hit', async () => {
        const mockHandler = jest.fn((req, res) =>
            res.status(200).json({ success: true, data: {} })
        );

        ParentStoreApiController.getSalesStats.mockImplementation(mockHandler);

        const res = await request(app)
            .get('/api/v1/parentStore/salesStats')
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });
});
