import CategoryController from '../src/controllers/CategoryController.js';
import Category from '../src/models/Category.js';
import { jest } from '@jest/globals';
import sequelize from '../src/database.js';

describe('CategoryController', () => {
    let consoleSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('createCategory should create a category successfully', async () => {
        const mockCategory = { id: 1, name: 'Electronics' };
        const mockCreate = jest.fn().mockResolvedValue(mockCategory);
        Category.create = mockCreate;

        const result = await CategoryController.createCategory('Electronics');

        expect(mockCreate).toHaveBeenCalledWith({ name: 'Electronics' }, { transaction: expect.any(Object) });
        expect(result).toEqual(mockCategory);
        expect(consoleSpy).toHaveBeenCalledWith('Category created successfully:');
    });
});