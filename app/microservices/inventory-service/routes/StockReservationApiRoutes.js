import express from 'express';
import StockReservationApiController from '../controllers/StockReservationApiController.js';

const StockReservationApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/inventory/stock-reservations/reserveStock:
 *   post:
 *     summary: Crée une réservation de stock
 *     description: |
 *       Crée une réservation de stock pour un produit spécifique et une commande donnée.
 *     tags:
 *       - Stock Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *                 description: Quantité à réserver
 *               ProductId:
 *                 type: integer
 *                 example: 1
 *                 description: ID du produit à réserver
 *               OrderId:
 *                 type: integer
 *                 example: 10
 *                 description: ID de la commande associée
 *             required:
 *               - quantity
 *               - ProductId
 *               - OrderId
 *     responses:
 *       201:
 *         description: Réservation de stock créée avec succès
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
 *                   example: "Stock reservation created successfully"
 *                 data:
 *                   type: object
 *                   description: Données de la réservation de stock créée
 *       400:
 *         description: Corps de requête invalide
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
 *                   example: "Invalid request body"
 *       500:
 *         description: Erreur interne du serveur lors de la création de la réservation de stock
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

StockReservationApiRouter.post('/reserveStock', StockReservationApiController.reserveStock);

export default StockReservationApiRouter;
