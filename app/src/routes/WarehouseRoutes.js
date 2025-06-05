import express from 'express';
import WarehouseController from '../controllers/WarehouseController.js';

const WarehouseRouter = express.Router();

WarehouseRouter.get('/stocks', WarehouseController.getWarehouseStocks);

export default WarehouseRouter;