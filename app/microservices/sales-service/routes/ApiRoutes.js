import express from 'express';

const ApiRouter = express.Router();

ApiRouter.use('/sales', (req, res) => {
    res.status(200).json({ message: 'Sales API endpoint' });
});

export default ApiRouter;