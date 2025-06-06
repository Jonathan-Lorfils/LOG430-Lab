import express from 'express';
import ParentStoreController from '../controllers/ParentStoreController.js';

const ParentStoreRouter = express.Router();

ParentStoreRouter.get('/dashboard', ParentStoreController.dashboard);

export default ParentStoreRouter;