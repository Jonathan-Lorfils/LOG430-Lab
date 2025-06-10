import express from 'express';
import StoreApiController from '../controllers/StoreApiController.js'

const StoreApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/stores/details/{storeId}:
 *   get:
 *     summary: Obtenir tous les détails d’un magasin (informations, ventes, stocks, produits populaires)
 *     tags:
 *       - Store
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du magasin à interroger
 *     responses:
 *       200:
 *         description: Données détaillées du magasin récupérées avec succès
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
 *                     store:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Store 1"
 *                         address:
 *                           type: string
 *                           example: "1 Elm St"
 *                         ParentStoreId:
 *                           type: integer
 *                           example: 1
 *                         Sales:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               subTotal:
 *                                 type: string
 *                                 example: "100.00"
 *                               saleDate:
 *                                 type: string
 *                                 format: date-time
 *                               StoreId:
 *                                 type: integer
 *                               SaleLines:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                     quantity:
 *                                       type: integer
 *                                     pricePerUnit:
 *                                       type: string
 *                                     SaleId:
 *                                       type: integer
 *                                     ProductId:
 *                                       type: integer
 *                                     Product:
 *                                       type: object
 *                                       properties:
 *                                         id:
 *                                           type: integer
 *                                         name:
 *                                           type: string
 *                                         price:
 *                                           type: string
 *                                         description:
 *                                           type: string
 *                                         CategoryId:
 *                                           type: integer
 *                     sales:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           subTotal:
 *                             type: string
 *                             example: "100.00"
 *                           saleDate:
 *                             type: string
 *                             format: date-time
 *                           StoreId:
 *                             type: integer
 *                           SaleLines:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 quantity:
 *                                   type: integer
 *                                 pricePerUnit:
 *                                   type: string
 *                                 SaleId:
 *                                   type: integer
 *                                 ProductId:
 *                                   type: integer
 *                                 Product:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                     name:
 *                                       type: string
 *                                     price:
 *                                       type: string
 *                                     description:
 *                                       type: string
 *                                     CategoryId:
 *                                       type: integer
 *                     mostSoldProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Product 1"
 *                           quantity:
 *                             type: integer
 *                             example: 35
 *                     stocks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           quantity:
 *                             type: integer
 *                           StoreId:
 *                             type: integer
 *                           WarehouseId:
 *                             type: integer
 *                             nullable: true
 *                           ProductId:
 *                             type: integer
 *                           Product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               name:
 *                                 type: string
 *                               price:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               CategoryId:
 *                                 type: integer
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
 *                   example: Internal Server Error
 *                 error:
 *                   type: string
 *                   example: "TypeError: Cannot read properties of undefined"
 */

StoreApiRouter.get('/details/:storeid', StoreApiController.getStoreDetails)

export default StoreApiRouter;