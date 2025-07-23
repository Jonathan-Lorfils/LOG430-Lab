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

/**
 * @swagger
 * /api/v1/inventory/stock-reservations/getStockReservationByOrderId/{id}:
 *   get:
 *     summary: Récupérer les réservations de stock associées à une commande
 *     description: |
 *       Cette route permet d'obtenir toutes les réservations de stock associées à un identifiant de commande (`OrderId`) donné.
 *     tags:
 *       - Stock Reservations
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 42
 *         description: Identifiant de la commande (OrderId)
 *     responses:
 *       200:
 *         description: Réservations de stock trouvées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       OrderId:
 *                         type: integer
 *                         example: 42
 *                       ProductId:
 *                         type: integer
 *                         example: 7
 *                       quantity:
 *                         type: integer
 *                         example: 10
 *                       status:
 *                         type: string
 *                         example: "reserved"
 *                       reservationDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-14T13:00:00Z"
 *       404:
 *         description: Aucune réservation de stock trouvée pour l'OrderId fourni
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
 *                   example: "Stock reservation not found"
 *       500:
 *         description: Erreur serveur
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
 *                   example: "Database error"
 */
StockReservationApiRouter.get('/getStockReservationByOrderId/:id', StockReservationApiController.getStockReservationByOrderId);

/**
 * @swagger
 * /api/v1/inventory/stock-reservations/cancelStockReservation/{orderId}:
 *   post:
 *     summary: Annule une réservation de stock par Order ID
 *     description: Libère les stocks associés à une commande donnée et supprime les réservations correspondantes.
 *     tags: [Stock Reservations]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID de la commande pour laquelle la réservation de stock doit être annulée
 *     responses:
 *       200:
 *         description: Réservation de stock annulée avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Stock reservation cancelled successfully
 *       400:
 *         description: ID de commande manquant ou invalide
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order ID is required
 *       404:
 *         description: Aucune réservation de stock trouvée pour cet ID de commande
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No stock reservation found for the provided Order ID
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: Error message
 */
StockReservationApiRouter.post('/cancelStockReservation/:orderId', StockReservationApiController.cancelStockReservationByOrderId);

export default StockReservationApiRouter;
