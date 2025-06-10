import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/database.js';

const VALID_TOKEN = 'token-static-123';

afterAll(async () => {
    await sequelize.close();
});

describe('GET /api/v1/parentStore/salesStats', () => {
    it('should return sales statistics with a valid token', async () => {
        const res = await request(app)
            .get('/api/v1/parentStore/salesStats')
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');

        const data = res.body.data;
        expect(data).toHaveProperty('storeRevenueByStore');
        expect(data).toHaveProperty('outOfStockProducts');
        expect(data).toHaveProperty('trendyProducts');

        expect(Array.isArray(data.storeRevenueByStore)).toBe(true);
        expect(Array.isArray(data.outOfStockProducts)).toBe(true);
        expect(Array.isArray(data.trendyProducts)).toBe(true);
    });

    it('should reject the request without a token', async () => {
        const res = await request(app)
            .get('/api/v1/parentStore/salesStats');

        expect(res.statusCode).toBe(401);
    });

    it('should reject the request with an invalid token', async () => {
        const res = await request(app)
            .get('/api/v1/parentStore/salesStats')
            .set('Authorization', 'Bearer invalid_token');

        expect(res.statusCode).toBe(403);
    });
});
