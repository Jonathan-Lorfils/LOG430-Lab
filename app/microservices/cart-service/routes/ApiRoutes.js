import express from 'express';
import CartApiRouter from './CartApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/carts', CartApiRouter);


export default ApiRouter;