import express from 'express';
import OrderApiController from '../controllers/OrderApiController.js';

const OrderApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/checkout/createOrder:
 *   post:
 *     summary: Crée une commande pour un client
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerId: 1
 *             orderLines:
 *               - productId: 101
 *                 quantity: 2
 *                 price: 9.99
 *               - productId: 202
 *                 quantity: 1
 *                 price: 19.99
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order created successfully
 *               order:
 *                 id: 55
 *                 customerId: 1
 *                 createdAt: "2025-06-24T15:30:00Z"
 *                 updatedAt: "2025-06-24T15:30:00Z"
 *                 orderLines:
 *                   - productId: 101
 *                     quantity: 2
 *                     price: 9.99
 *                   - productId: 202
 *                     quantity: 1
 *                     price: 19.99
 *       500:
 *         description: Erreur lors de la création de la commande
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Unable to create order"
 */
OrderApiRouter.post('/createOrder', OrderApiController.createOrder);

/**
 * @swagger
 * /api/v1/checkout/getOrderByCustomerId/{customerId}:
 *   get:
 *     summary: Récupère toutes les commandes d’un client
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               orders:
 *                 - id: 55
 *                   customerId: 1
 *                   createdAt: "2025-06-24T15:30:00Z"
 *                   updatedAt: "2025-06-24T15:30:00Z"
 *                   orderLines:
 *                     - productId: 101
 *                       quantity: 2
 *                       price: 9.99
 *                 - id: 56
 *                   customerId: 1
 *                   createdAt: "2025-06-23T10:00:00Z"
 *                   updatedAt: "2025-06-23T10:00:00Z"
 *                   orderLines:
 *                     - productId: 301
 *                       quantity: 1
 *                       price: 14.99
 *       500:
 *         description: Erreur lors de la récupération des commandes
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Cache or database error"
 */
OrderApiRouter.get('/getOrderByCustomerId/:customerId', OrderApiController.getOrderByCustomerId);

/**
 * @swagger
 * /api/v1/checkout/confirmOrder/{orderId}:
 *   post:
 *     summary: Confirme une commande existante
 *     description: Met à jour le statut de la commande à "completed" si elle existe.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de la commande à confirmer
 *     responses:
 *       200:
 *         description: Commande confirmée avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order confirmed successfully
 *               order:
 *                 id: 1
 *                 customerId: 55
 *                 status: "completed"
 *                 createdAt: "2025-06-24T15:30:00Z"
 *                 updatedAt: "2025-07-15T16:10:00Z"
 *       404:
 *         description: Commande introuvable
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Error detail"
 */
OrderApiRouter.post('/confirmOrder/:orderId', OrderApiController.confirmOrder);

/**
 * @swagger
 * /api/v1/checkout/cancelOrder/{orderId}:
 *   post:
 *     summary: Annule une commande existante
 *     description: Annule la commande correspondant à l'identifiant fourni. La commande passe au statut "cancelled".
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de la commande à annuler
 *     responses:
 *       200:
 *         description: Commande annulée avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order cancelled successfully
 *               order:
 *                 id: 1
 *                 customerId: 55
 *                 status: "cancelled"
 *                 createdAt: "2025-06-24T15:30:00Z"
 *                 updatedAt: "2025-07-15T15:30:00Z"
 *       404:
 *         description: Commande introuvable
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Error detail"
 */
OrderApiRouter.post('/cancelOrder/:orderId', OrderApiController.cancelOrder);

export default OrderApiRouter;
