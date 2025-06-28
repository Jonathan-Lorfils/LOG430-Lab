import express from 'express';
import CustomerApiRouter from './CustomerApiRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/customer', CustomerApiRouter);

export default ApiRouter;