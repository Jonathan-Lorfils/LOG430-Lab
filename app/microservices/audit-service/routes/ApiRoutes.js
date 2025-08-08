import express from 'express';
import ReplayRouter from './ReplayRoutes.js';

const ApiRouter = express.Router();

ApiRouter.use('/audit', ReplayRouter);

export default ApiRouter;