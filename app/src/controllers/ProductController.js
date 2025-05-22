import Product from '../models/Product.js';
import sequelize from '../database.js';
import Category from '../models/Category.js';
import CategoryController from './CategoryController.js';

const ProductController = {
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
                const newCategory = await CategoryController.createCategory(categoryName);
                categoryId = newCategory.id;
            }
            console.log(categoryId)

            const product = await Product.create({
                name: name,
                price: price,
                stockQuantity: stockQuantity,
                categoryId: categoryId
            }, { transaction: t });

            await t.commit();
            console.log('Product created successfully:');
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
                console.log(`Produit trouvé : ID: ${product.id}, Nom: ${product.name}, Prix: ${product.price}, Quantité: ${product.stockQuantity}`);
            } else {
                console.log('Product not found');
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
                console.log(`Produit trouvé : ID: ${product.id}, Nom: ${product.name}, Prix: ${product.price}, Quantité: ${product.stockQuantity}`);
            } else {
                console.log('Product not found');
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
                    products.forEach(product => {
                        console.log(`ID: ${product.id}, Nom: ${product.name}, Prix: ${product.price}, Quantité: ${product.stockQuantity}`);
                    });
                } else {
                    console.log('No products found in this category');
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
                products.forEach(product => {
                    console.log(`ID: ${product.id}, Nom: ${product.name}, Prix: ${product.price}, Quantité: ${product.stockQuantity}`);
                });
                return products;
            } else {
                console.log('No products found');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    async returnProduct(id, quantity) {
        try {
            const product = await Product.findOne({
                where: {
                    id: id
                }
            });

            if (product) {
                product.stockQuantity = parseInt(product.stockQuantity) + parseInt(quantity);
                await product.save();
                console.log('Produit retourné avec succès !');
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.error('Error returning product:', error);
            throw error;
        }
    }
};

export default ProductController;