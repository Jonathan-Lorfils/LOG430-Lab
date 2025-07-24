import express from 'express';
import OrderOrchestratorRouter from './OrderOrchestrator/routes/OrderOrchestratorRoutes.js'

const ApiRouter = express.Router();

ApiRouter.use('/orchestrator/order-orchestrator', OrderOrchestratorRouter);

export default ApiRouter;