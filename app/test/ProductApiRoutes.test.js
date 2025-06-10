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

describe('PUT /api/v1/products/updateProduct/:productid', () => {
    it('should update a product with valid token and data', async () => {
        const productId = 1;
        const updateData = {
            name: "Updated Product",
            price: 29.99,
            description: "New product description"
        };

        const res = await request(app)
            .put(`/api/v1/products/updateProduct/${productId}`)
            .set('Authorization', `Bearer ${VALID_TOKEN}`)
            .send(updateData);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message', 'Product updated successfully');
    });

    it('should reject the request with no token', async () => {
        const res = await request(app)
            .put('/api/v1/products/updateProduct/1')
            .send({ name: "No Token", price: 9.99 });

        expect(res.statusCode).toBe(401);
    });

    it('should reject the request with an invalid token', async () => {
        const res = await request(app)
            .put('/api/v1/products/updateProduct/1')
            .set('Authorization', 'Bearer invalid_token')
            .send({ name: "Bad Token", price: 9.99 });

        expect(res.statusCode).toBe(403);
    });

    it('should return 500 if the product does not exist', async () => {
        const res = await request(app)
            .put('/api/v1/products/updateProduct/999999')
            .set('Authorization', `Bearer ${VALID_TOKEN}`)
            .send({
                name: "Ghost Product",
                price: 99.99,
                description: "Should fail"
            });

        expect([500]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('success', false);
    });
});
