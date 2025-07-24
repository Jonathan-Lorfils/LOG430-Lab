import Replenishment from "./models/Replenishment.js";
import Stock from "./models/Stock.js";
import Warehouse from "./models/Warehouse.js";
import StockReservation from "./models/StockReservation.js";

const GenerateFakeData = {
    async createReplenishment(requestedQuantity, status, stockId) {
        try {
            const replenishment = await Replenishment.create({
                requestedQuantity: requestedQuantity,
                status: status,
                StockId: stockId
            });
            return replenishment;
        } catch (error) {
            console.error('Error creating replenishment:', error);
            throw error;
        }
    },

    async createStock(quantity, productId, warehouseId) {
        try {
            const stock = await Stock.create({
                quantity: quantity,
                ProductId: productId,
                WarehouseId: warehouseId
            });
            return stock;
        } catch (error) {
            console.error('Error creating stock:', error);
            throw error;
        }
    },

    async createWarehouse(name, address, parentStoreId) {
        try {
            const warehouse = await Warehouse.create({
                name: name,
                address: address,
                ParentStoreId: parentStoreId
            });
            return warehouse;
        } catch (error) {
            console.error('Error creating warehouse:', error);
            throw error;
        }
    },

    async createStockReservation(orderId, productId, quantity, status, reservationDate, stockId) {
        try {
            const stockReservation = await StockReservation.create({
                OrderId: orderId,
                ProductId: productId,
                quantity: quantity,
                status: status,
                reservationDate: reservationDate,
                StockId: stockId
            });
            return stockReservation;
        } catch (error) {
            console.error('Error creating stock reservation:', error);
            throw error;
        }
    },

    async generate(numberOfStocks = 10, numberOfReplenishments = 6, numberOfStockReservations = 5) {
        const warehouse = await this.createWarehouse('Main Warehouse', '123 Main St', 1);
        try {
            for (let i = 0; i < numberOfStocks; i++) {
                const quantity = 9999;
                const productId = i + 1;

                await this.createStock(quantity, productId, warehouse.id);
            }

            for (let i = 0; i < numberOfReplenishments; i++) {
                const requestedQuantity = Math.floor(Math.random() * 50) + 1;
                const status = Math.random() > 0.5 ? 'pending' : 'completed';
                const stockId = i + 1;

                await this.createReplenishment(requestedQuantity, status, stockId);
            }

            for (let i = 0; i < numberOfStockReservations; i++) {
                const orderId = i + 1;
                const productId = i + 1;
                const quantity = Math.floor(Math.random() * 5) + 1;
                const status = 'completed';
                const reservationDate = new Date().toISOString();
                const stockId = i + 1;
                await this.createStockReservation(orderId, productId, quantity, status, reservationDate, stockId);
            }

            console.log(`${numberOfStocks} stocks generated successfully.`);
        } catch (error) {
            console.error('Error generating fake data:', error);
        }
    }
};

export default GenerateFakeData;