import express from 'express';
import StockReservationApiController from '../controllers/StockReservationApiController.js';

const StockReservationApiRouter = express.Router();

StockReservationApiRouter.post('/', StockReservationApiController.reserveStock);

export default StockReservationApiRouter;