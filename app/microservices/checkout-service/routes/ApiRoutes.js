import express from 'express';
import OrderApiRouter from './OrderApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/checkout', OrderApiRouter);

export default ApiRouter;