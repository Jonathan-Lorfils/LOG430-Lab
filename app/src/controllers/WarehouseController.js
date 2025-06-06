import WarehouseService from '../services/WarehouseService.js';

const WarehouseController = {
    async getWarehouseStocks(req, res) {
        try {
            const warehouse = await WarehouseService.getWarehouseStocks();
            const stocks = warehouse.Stocks
            res.render('warehouseStocks', {
                warehouse: warehouse,
                stocks: stocks
            });
        } catch (error) {
            console.error('Error fetching warehouse stocks:', error);
            res.status(500).json({ error: 'Failed to fetch warehouse stocks' });
        }
    }
}

export default WarehouseController;