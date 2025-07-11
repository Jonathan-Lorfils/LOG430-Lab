import express from 'express';
import StockApiController from '../controllers/StockApiController';

const StockApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/inventory/stocks/check-availability/{stockid}/{quantity}:
 *   get:
 *     summary: Vérifie la disponibilité d'un stock spécifique
 *     description: |
 *       Vérifie si la quantité demandée d'un produit spécifique est disponible en stock.
 *     tags:
 *       - Stocks
 *     parameters:
 *       - in: path
 *         name: stockid
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID du stock à vérifier
 *       - in: path
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Quantité demandée pour vérifier la disponibilité
 *     responses:
 *       200:
 *         description: Résultat de la vérification de la disponibilité du stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Stock availability checked successfully"
 *       400:
 *         description: Requête invalide, par exemple quantité invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid requested quantity"
 *       500:
 *         description: Erreur interne du serveur lors de la vérification du stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Database connection error"
 */

StockApiRouter.get('/check-availability/:stockid/:quantity', StockApiController.checkStockAvailability);

export default StockApiRouter;
