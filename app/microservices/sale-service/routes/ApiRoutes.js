import express from 'express';

const ApiRouter = express.Router();

ApiRouter.use('/sale', (req, res) => {
    res.status(200).json({ message: 'Sales API endpoint' });
});

export default ApiRouter;