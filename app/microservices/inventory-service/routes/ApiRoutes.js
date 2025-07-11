import express from 'express';
import ReplenishmentApiRouter from './ReplenishmentApiRoutes.js';
import StockApiRouter from './StockApiRoutes.js';
import StockReservationApiRouter from './StockReservationApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/inventory/replenishments', ReplenishmentApiRouter);

ApiRouter.use('/inventory/stocks', StockApiRouter);

ApiRouter.use('/inventory/stock-reservations', StockReservationApiRouter);

export default ApiRouter;