import express from 'express';
import ReplenishmentApiRouter from './ReplenishmentApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/inventory/replenishments', ReplenishmentApiRouter);

export default ApiRouter;