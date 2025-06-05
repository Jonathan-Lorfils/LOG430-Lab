import express from 'express';
import StoreController from '../controllers/StoreController.js';

const StoreRouter = express.Router();

StoreRouter.get('/allStores', StoreController.getAllStores);
StoreRouter.get('/details/:storeid', StoreController.getStoreDetails)



export default StoreRouter;