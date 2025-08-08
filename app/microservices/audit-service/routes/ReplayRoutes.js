import express from 'express';
import ReplayController from '../controllers/ReplayControllers.js';

const ReplayRouter = express.Router();

/**
 * @swagger
 * /api/v1/audit/replay/cart/{cartId}:
 *   get:
 *     summary: Rejouer tous les événements d'un panier
 *     description: |
 *       Récupère et rejoue tous les événements de type `Cart` pour reconstruire
 *       l'état actuel du panier à partir de l'Event Store (`audit_logs`).
 *       L'ordre des événements est respecté grâce au champ `version`.
 *     tags:
 *       - Replay
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Identifiant unique du panier à rejouer.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: État reconstruit du panier.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: État final du panier après replay.
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     customerId:
 *                       type: string
 *                       example: "cust_456"
 *                     status:
 *                       type: string
 *                       example: "OPEN"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                             example: "p-42"
 *                           price:
 *                             type: number
 *                             example: 19.99
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                     total:
 *                       type: number
 *                       example: 39.98
 *                     currency:
 *                       type: string
 *                       example: "CAD"
 *                 meta:
 *                   type: object
 *                   description: Métadonnées sur le replay.
 *                   properties:
 *                     eventsCount:
 *                       type: integer
 *                       example: 4
 *                     version:
 *                       type: integer
 *                       example: 4
 *       404:
 *         description: Aucun événement trouvé pour ce panier.
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
 *                   example: "Cart 1 not found"
 *       500:
 *         description: Erreur interne du serveur.
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
 *                   example: "TypeError: Cannot read property ..."
 */
ReplayRouter.get('/replay/cart/:cartId', ReplayController.replayCart);

export default ReplayRouter;
