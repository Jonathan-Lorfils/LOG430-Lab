import express from 'express';
import OrderOrchestratorRouter from './OrderOrchestrator/routes/orderOrchestratorRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/order-orchestrator', OrderOrchestratorRouter);

export default ApiRouter;