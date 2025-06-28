import express from 'express';
import ProductApiRouter from './ProductApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/product', ProductApiRouter);

export default ApiRouter;