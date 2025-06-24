import express from 'express';
import CartApiRouter from './CartApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/cart', CartApiRouter);


export default ApiRouter;