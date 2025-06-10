import express from 'express';
import ParentStoreApiController from '../controllers/ParentStoreApiController.js';

const ParentStoreApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/parentStore/salesStats:
 *   get:
 *     summary: Obtenir les statistiques des magasins
 *     tags:
 *       - ParentStore
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
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
 *                   properties:
 *                     storeRevenueByStore:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           storeName:
 *                             type: string
 *                             example: "Store 1"
 *                           totalRevenue:
 *                             type: string
 *                             example: "0100.00"
 *                     outOfStockProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           storeName:
 *                             type: string
 *                             example: "Store 2"
 *                           productName:
 *                             type: string
 *                             example: "Product 2"
 *                           quantity:
 *                             type: integer
 *                             example: 0
 *                     trendyProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           storeName:
 *                             type: string
 *                             example: "Store 3"
 *                           mostSoldProducts:
 *                             type: array
 *                             items:
 *                               type: array
 *                               items:
 *                                 oneOf:
 *                                   - type: string
 *                                     example: "Product 3"
 *                                   - type: integer
 *                                     example: 600
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
 *                   example: Internal Server Error
 *                 error:
 *                   type: string
 *                   example: "TypeError: Cannot read properties of undefined"
 */
ParentStoreApiRouter.get('/salesStats', ParentStoreApiController.getSalesStats);

export default ParentStoreApiRouter;
