import express from 'express';
import ReplenishmentController from '../controllers/ReplenishmentController.js';

const ReplenishmentRouter = express.Router();

ReplenishmentRouter.get('/form/:stockid', ReplenishmentController.replenishmentForm);
ReplenishmentRouter.get('/create/:quantity/:stockid', ReplenishmentController.createRepleplenishment)



export default ReplenishmentRouter;