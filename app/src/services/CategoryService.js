import Category from '../models/Category.js';
import sequelize from '../database.js';

const CategoryService = {
    async createCategory(categoryName) {
        const t = await sequelize.transaction();

        try {
            const category = await Category.create({
                name: categoryName
            }, { transaction: t });

            await t.commit();
            return category;
        } catch (error) {
            await t.rollback();
            console.error('Error creating category:', error);
            throw error;
        }
    }
};

export default CategoryService;