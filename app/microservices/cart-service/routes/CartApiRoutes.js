import express from 'express';
import CartApiController from '../controllers/CartApiController.js';

const CartApiRouter = express.Router();

/**
 * @swagger
 * /api/v1/carts/createCart/{customerid}:
 *   post:
 *     summary: Crée un panier pour un client
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: customerid
 *         required: true
 *         description: ID du client
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Panier créé avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Cart successfully created
 *               data:
 *                 cartId: "c123"
 *                 customerId: "1"
 *                 createdAt: "2025-06-24T15:00:00Z"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Database error"
 */
CartApiRouter.post('/createCart/:customerid', CartApiController.createCart);

/**
 * @swagger
 * /api/v1/carts/{cartid}/addItem:
 *   post:
 *     summary: Ajoute un item à un panier
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartid
 *         required: true
 *         description: ID du panier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: "123"
 *             price: 9.99
 *             quantity: 2
 *     responses:
 *       201:
 *         description: Article ajouté au panier avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Item added to cart
 *               data:
 *                 itemId: "item456"
 *                 productId: "123"
 *                 quantity: 2
 *                 price: 9.99
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Unable to add item"
 */
CartApiRouter.post('/:cartid/addItem', CartApiController.addItemToCart);

/**
 * @swagger
 * /api/v1/carts/{cartid}/deleteItem/{cartitemid}:
 *   delete:
 *     summary: Supprime un item d’un panier
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartid
 *         required: true
 *         description: ID du panier
 *         schema:
 *           type: string
 *       - in: path
 *         name: cartitemid
 *         required: true
 *         description: ID de l’article à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Item deleted from cart
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Item not found"
 */
CartApiRouter.delete('/:cartid/deleteItem/:cartitemid', CartApiController.deleteItemFromCart);

/**
 * @swagger
 * /api/v1/carts/customer/{customerid}:
 *   get:
 *     summary: Récupère le panier d’un client
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: customerid
 *         required: true
 *         description: ID du client
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Panier récupéré avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Cart fetched successfully
 *               data:
 *                 cartId: "c123"
 *                 items:
 *                   - productId: "123"
 *                     quantity: 2
 *                     price: 9.99
 *                   - productId: "456"
 *                     quantity: 1
 *                     price: 19.99
 *       404:
 *         description: Panier introuvable
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Cart not found
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 *               error: "Database connection failed"
 */
CartApiRouter.get('/customer/:customerid', CartApiController.getCartByCustomerId);

export default CartApiRouter;
