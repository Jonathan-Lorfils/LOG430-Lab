import StockService from '../services/StockService.js';
import ReplenishmentService from '../services/ReplenishmentService.js';

const ReplenishmentController = {
    async replenishmentForm(req, res) {
        try {
            const stockId = req.params.stockid;
            const stock = await StockService.getStockById(stockId);
            if (!stock) {
                return res.status(404).send('Stock not found');
            }
            const product = stock.Product;
            res.render('replenishmentForm', { stock, product });
        } catch (error) {
            console.error('Error rendering replenishment form:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    async createRepleplenishment(req, res) {
        try {
            const stockId = req.params.stockid;
            const requestedQuantity = parseInt(req.params.quantity, 10);
            if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
                return res.status(400).send('Invalid quantity requested');
            }

            const replenishment = await ReplenishmentService.createReplenishment(stockId, requestedQuantity);
            res.render('replenishmentConfirmation', { replenishment });
        } catch (error) {
            console.error('Error creating replenishment:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default ReplenishmentController;