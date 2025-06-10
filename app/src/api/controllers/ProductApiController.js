import ProductService from '../../services/ProductService.js';

const ProductApiController = {
    async updateProduct(req, res) {
        try {
            const productId = req.params.productid;
            const productData = req.body;
            const result = await ProductService.updateProduct(productId, productData);

            return res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);

            return res.status(500).json({
                success: false,
                message: 'Erreur interne du serveur',
                error: error.message
            });
        }
    },
};

export default ProductApiController;