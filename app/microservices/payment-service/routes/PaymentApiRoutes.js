import express from 'express';
import PaymentController from '../controllers/PaymentController.js';
import Payment from '../models/Payment.js';

const PaymentApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/payment/process-payment:
 *   post:
 *     summary: Traite un paiement pour une commande
 *     description: |
 *       Crée un enregistrement de paiement pour une commande existante, puis le traite en changeant son statut à `completed`.
 *     tags:
 *       - Paiement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - method
 *               - OrderId
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 99.99
 *               method:
 *                 type: string
 *                 description: "Méthode de paiement (ex: 'credit_card', 'paypal')"
 *                 example: credit_card
 *               OrderId:
 *                 type: integer
 *                 description: Identifiant de la commande associée
 *                 example: 123
 *     responses:
 *       201:
 *         description: Paiement traité avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 amount:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 method:
 *                   type: string
 *                   example: credit_card
 *                 status:
 *                   type: string
 *                   example: completed
 *                 OrderId:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-07-13T14:00:00.000Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-07-13T14:00:01.000Z'
 *       400:
 *         description: Champs requis manquants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required fields
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
PaymentApiRouter.post('/process-payment', PaymentController.processPayment);

/**
 * @swagger
 * /api/v1/payment/get-payment-by-order/{OrderId}:
 *   get:
 *     summary: Récupère le paiement associé à une commande
 *     description: |
 *       Retourne le paiement lié à l'identifiant de commande fourni (`OrderId`).
 *     tags:
 *       - Paiement
 *     parameters:
 *       - name: OrderId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Identifiant de la commande pour laquelle on veut récupérer le paiement
 *     responses:
 *       200:
 *         description: Paiement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 amount:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 method:
 *                   type: string
 *                   example: credit_card
 *                 status:
 *                   type: string
 *                   example: completed
 *                 OrderId:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-07-13T14:00:00.000Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-07-13T14:01:00.000Z'
 *       400:
 *         description: OrderId manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Order ID is required
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
PaymentApiRouter.get('/get-payment-by-order/:OrderId', PaymentController.getPaymentByOrderId);

export default PaymentApiRouter;
