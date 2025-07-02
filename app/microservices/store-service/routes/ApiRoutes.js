import express from 'express';

const ApiRouter = express.Router();

ApiRouter.use('/store', (req, res) => {
    res.status(200).json({ message: 'Store API endpoint' });
});

export default ApiRouter;