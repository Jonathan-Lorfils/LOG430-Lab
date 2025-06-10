import express from 'express';
import ProductApiController from '../controllers/ProductApiController.js';

const ProductApiRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductUpdateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Produit modifié"
 *         price:
 *           type: number
 *           format: float
 *           example: 19.99
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Description du produit"
 *       required:
 *         - name
 *         - price
 * 
 *     UpdateProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Product updated successfully"

 * /api/v1/products/updateProduct/{productid}:
 *   put:
 *     summary: Met à jour un produit existant
 *     tags:
 *       - Produits
 *     parameters:
 *       - in: path
 *         name: productid
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateRequest'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProductResponse'
 *       400:
 *         description: Requête invalide (ex. données manquantes ou invalides)
 *       500:
 *         description: Erreur interne du serveur
 */
ProductApiRouter.put('/updateProduct/:productid/', ProductApiController.updateProduct)

export default ProductApiRouter;