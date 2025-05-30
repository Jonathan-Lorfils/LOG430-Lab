import Product from '../models/Product.js';
import sequelize from '../database.js';
import Category from '../models/Category.js';
import CategoryService from './CategoryService.js';

const ProductService = {
    async createProduct(name, price, stockQuantity, categoryName) {
        let categoryId = null;
        const t = await sequelize.transaction()

        try {
            const category = await Category.findOne({
                where: {
                    name: categoryName
                }
            });

            if (category) {
                categoryId = category.id;
            } else {
                const newCategory = await CategoryService.createCategory(categoryName);
                categoryId = newCategory.id;
            }

            const product = await Product.create({
                name: name,
                price: price,
                stockQuantity: stockQuantity,
                categoryId: categoryId
            }, { transaction: t });

            await t.commit();
            return product;
        } catch (error) {
            await t.rollback();
            console.error('Error creating product:', error);
            throw error;
        }
    },

    async searchProductByName(name) {
        try {
            const product = await Product.findOne({
                where: {
                    name: name
                }
            });

            if (product) {
                return product
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error searching for product:', error);
            throw error;
        }
    },

    async searchProductById(id) {
        try {
            const product = await Product.findOne({
                where: {
                    id: id
                }
            });

            if (product) {
                return product
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error searching for product:', error);
            throw error;
        }
    },

    async searchProductByCategory(categoryName) {
        try {
            const category = await Category.findOne({
                where: {
                    name: categoryName
                }
            });

            if (category) {
                const products = await Product.findAll({
                    where: {
                        categoryId: category.id
                    }
                });

                if (products.length > 0) {
                    return products
                } else {
                    return null;
                }
            } else {
                console.log('Category not found');
            }
        } catch (error) {
            console.error('Error searching for product by category:', error);
            throw error;
        }
    },

    async getAllProducts() {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    as: 'category'
                }]
            });

            if (products.length > 0) {
                return products;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
};

export default ProductService;