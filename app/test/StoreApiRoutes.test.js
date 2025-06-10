import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/database.js';
import CreateFakeData from '../src/CreateFakeData.js';

const VALID_TOKEN = 'token-static-123';

afterAll(async () => {
    await sequelize.close();
});

describe('GET /api/v1/stores/details/:storeid', () => {
    it('should return store details with a valid token', async () => {
        const response = await request(app)
            .get('/api/v1/stores/details/1')
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('store');
        expect(response.body.data).toHaveProperty('sales');
        expect(response.body.data).toHaveProperty('stocks');
        expect(response.body.data).toHaveProperty('mostSoldProducts');
    });

    it('should reject the request without a token', async () => {
        const response = await request(app)
            .get('/api/v1/stores/details/1');

        expect(response.statusCode).toBe(401);
    });

    it('should reject the request with an invalid token', async () => {
        const response = await request(app)
            .get('/api/v1/stores/details/1')
            .set('Authorization', 'Bearer invalid_token');

        expect(response.statusCode).toBe(403);
    });

    it('should return a 500 error if the store ID does not exist (or simulated server error)', async () => {
        const response = await request(app)
            .get('/api/v1/stores/details/999999')
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect([500]).toContain(response.statusCode);
        expect(response.body).toHaveProperty('success', false);
    });
});
