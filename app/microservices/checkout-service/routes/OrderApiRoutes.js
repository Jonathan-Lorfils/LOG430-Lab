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

export default OrderApiRouter;
