import Payment from "./models/Payment.js";

const generateFakeData = {
    async createPayment(amount, method, OrderId) {
        try {
            const payment = await Payment.create({
                amount: amount,
                method: method,
                OrderId: OrderId,
                status: 'pending' // Default status
            });
            return payment;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    },

    async generate(numberOfPayments = 10) {
        try {
            for (let i = 0; i < numberOfPayments; i++) {
                const amount = (Math.random() * 100).toFixed(2);
                const method = Math.random() > 0.5 ? 'credit_card' : 'paypal';
                const OrderId = i + 1;

                await this.createPayment(amount, method, OrderId);
            }
            console.log(`${numberOfPayments} payments generated successfully.`);
        } catch (error) {
            console.error('Error generating fake data:', error);
        }
    }
}

export default generateFakeData;