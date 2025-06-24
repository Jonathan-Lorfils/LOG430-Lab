import express from 'express';
import ReplenishmentApiController from '../controllers/ReplenishmentApiController.js';

const ReplenishmentApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/replenishments/create/{stockid}/{quantity}:
 *   post:
 *     summary: Créer un réapprovisionnement pour un stock donné
 *     tags:
 *       - Replenishments
 *     parameters:
 *       - in: path
 *         name: stockid
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du stock à réapprovisionner
 *       - in: path
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quantité à réapprovisionner
 *     responses:
 *       201:
 *         description: Réapprovisionnement créé avec succès
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
 *                   example: Réapprovisionnement créé avec succès
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 42
 *                     stockId:
 *                       type: integer
 *                       example: 3
 *                     quantity:
 *                       type: integer
 *                       example: 10
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-09T14:32:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-09T14:32:00.000Z"
 *       400:
 *         description: Quantité invalide
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
 *                   example: Quantité demandée invalide
 *       500:
 *         description: Erreur interne du serveur
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
 *                   example: Erreur interne du serveur
 *                 error:
 *                   type: string
 *                   example: "TypeError: Cannot read properties of undefined"
 */
ReplenishmentApiRouter.post('/create/:stockid/:quantity', ReplenishmentApiController.createRepleplenishment);

export default ReplenishmentApiRouter;