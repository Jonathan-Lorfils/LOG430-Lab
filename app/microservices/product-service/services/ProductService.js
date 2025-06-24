import Product from '../models/Product.js';
import logger from '../utils/logger.js';

const ProductService = {
    async updateProduct(productId, productData) {
        try {
            const [updatedRows] = await Product.update(productData, {
                where: { id: productId }
            });

            if (updatedRows === 0) {
                throw new Error('Product not found or no changes made');
            }

            return { success: true, message: 'Product updated successfully' };
        } catch (error) {
            logger.error('Error updating product :', error)
            throw error;
        }
    }
}

export default ProductService;