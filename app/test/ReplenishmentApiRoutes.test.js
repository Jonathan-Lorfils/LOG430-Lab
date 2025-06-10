import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/database.js';

const VALID_TOKEN = 'token-static-123';

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await CreateFakeData.generate();
});

afterAll(async () => {
    await sequelize.close();
});

describe('POST /api/v1/replenishments/create/:stockid/:quantity', () => {
    it('should create a replenishment with valid stock ID, quantity, and token', async () => {
        const stockId = 1;
        const quantity = 10;

        const res = await request(app)
            .post(`/api/v1/replenishments/create/${stockId}/${quantity}`)
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('StockId', stockId);
        expect(res.body.data).toHaveProperty('requestedQuantity', quantity);
    });

    it('should reject the request with no token', async () => {
        const res = await request(app)
            .post('/api/v1/replenishments/create/1/10');

        expect(res.statusCode).toBe(401);
    });

    it('should reject the request with an invalid token', async () => {
        const res = await request(app)
            .post('/api/v1/replenishments/create/1/10')
            .set('Authorization', 'Bearer invalid_token');

        expect(res.statusCode).toBe(403);
    });

    it('should return 400 for invalid quantity', async () => {
        const res = await request(app)
            .post('/api/v1/replenishments/create/1/-5')
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 500 if the stock ID does not exist', async () => {
        const res = await request(app)
            .post('/api/v1/replenishments/create/999999/10')
            .set('Authorization', `Bearer ${VALID_TOKEN}`);

        expect([500]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('success', false);
    });
});
