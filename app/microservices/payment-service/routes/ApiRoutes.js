import express from 'express';
import PaymentApiRouter from './PaymentApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/payment', PaymentApiRouter);

export default ApiRouter;