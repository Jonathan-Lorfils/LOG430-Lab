import ProductService from '../../services/ProductService.js';
import logger from '../../utils/logger.js';
import redis from '../../utils/redisClient.js';

const ProductApiController = {
    async updateProduct(req, res) {
        const productId = req.params.productid;
        logger.info(`Request received for PUT /api/v1/products/updateProduct with productId: ${productId}`);

        try {
            const productData = req.body;
            logger.info(`Updating product with productId: ${productId}`);
            const result = await ProductService.updateProduct(productId, productData);

            // Invalidate cache
            await redis.del('allProducts');
            logger.info(`Cache 'allProducts' invalidated after product update for ID: ${productId}`);

            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (error) {
            logger.error(`Error while updating product with productId: ${productId}`, {
                error: error.message
            });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },
};

export default ProductApiController;
