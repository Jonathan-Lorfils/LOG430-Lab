import amqp from 'amqplib';
import { handleCartEvent } from '../events/eventHandler.js';
import logger from '../utils/logger.js';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE = 'cart.events';
const QUEUE = 'notification.cart.queue';

export async function startCartEventConsumer() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

        await channel.assertQueue(QUEUE, { durable: true });
        await channel.bindQueue(QUEUE, EXCHANGE, 'cart.*');

        channel.consume(QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const event = JSON.parse(msg.content.toString());
                    await handleCartEvent(event);
                    channel.ack(msg);
                } catch (err) {
                    logger.error({
                        message: 'Erreur de traitement du message',
                        raw: msg.content.toString(),
                        error: err.message,
                        stack: err.stack
                    });
                }
            }
        });

        logger.info('NotificationService: connecté à RabbitMQ, en attente des événements...');
    } catch (err) {
        logger.error({
            message: 'Échec de connexion à RabbitMQ',
            error: err.message,
            stack: err.stack
        });
    }
}
