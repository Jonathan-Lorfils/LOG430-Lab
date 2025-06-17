import request from 'supertest';
import app from '../src/app.js';
import ProductApiController from '../src/api/controllers/ProductApiController.js';
import { jest, expect } from "@jest/globals";

jest.mock('../src/api/controllers/ProductApiController.js');

describe('Route trigger - PUT /api/v1/products/updateProduct/:productid', () => {
    it('should call ProductController.updateProduct when the route is hit', async () => {
        const mockHandler = jest.fn((req, res) => res.status(200).json({}));
        ProductApiController.updateProduct.mockImplementation(mockHandler);

        await request(app)
            .put('/api/v1/products/updateProduct/123')
            .set('Authorization', 'Bearer token-static-123')
            .send({ name: 'Test', price: 10 });

        expect(mockHandler).toHaveBeenCalled();
    });
});
