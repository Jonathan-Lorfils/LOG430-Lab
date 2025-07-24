import express from 'express';
import OrderOrchestratorController from '../controllers/OrderOrchestratorController.js';

const OrderOrchestratorRouter = express.Router();

/**
 * @swagger
 * /api/v1/orchestrator/order-orchestrator/createOrder:
 *   post:
 *     summary: Orchestration de la création d'une commande client
 *     description: >
 *       Déclenche le processus de Saga orchestrée : vérification du stock, réservation, paiement, et confirmation de commande.
 *       Met à jour l'état de la commande à chaque étape.
 *       
 *       En cas d’échec (stock insuffisant ou paiement refusé), des actions de compensation sont exécutées et la commande est annulée.
 *     tags: [Orchestrator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - OrderLines
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 129.99
 *               OrderLines:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Commande orchestrée avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Commande 42 orchestrée avec succès."
 *       500:
 *         description: Erreur pendant l'orchestration
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Erreur lors de l'orchestration"
 *               error: "Stock insuffisant pour le produit 101"
 */
OrderOrchestratorRouter.post('/createOrder', OrderOrchestratorController.orchestrateOrder);

export default OrderOrchestratorRouter;
