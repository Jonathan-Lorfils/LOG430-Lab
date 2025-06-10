import express from 'express';
import StoreApiRouter from './StoreApiRoutes.js';
import ParentStoreApiRouter from './ParentStoreApiRoutes.js';
import ProductApiRouter from './ProductApiRoutes.js';
import ReplenishmentApiRouter from './ReplenishmentApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/parentStore', ParentStoreApiRouter)
ApiRouter.use('/stores', StoreApiRouter);
ApiRouter.use('/products', ProductApiRouter);
ApiRouter.use('/replenishments', ReplenishmentApiRouter);

export default ApiRouter;