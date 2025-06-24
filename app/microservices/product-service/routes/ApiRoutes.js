import express from 'express';
import ProductApiRouter from './ProductApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/products', ProductApiRouter);

export default ApiRouter;