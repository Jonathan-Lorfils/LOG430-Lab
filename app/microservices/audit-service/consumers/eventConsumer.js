import amqp from 'amqplib';
import AuditService from '../service/AuditService.js';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE = 'cart.events';
const QUEUE = 'audit-queue';

export async function startConsumer() {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();

    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    await channel.assertQueue(QUEUE, { durable: true });

    await channel.bindQueue(QUEUE, EXCHANGE, 'cart.#');

    console.log('audit-service is consuming from cart.events exchange (routing key: cart.#)');

    channel.consume(QUEUE, async (msg) => {
        if (msg !== null) {
            const content = JSON.parse(msg.content.toString());
            await AuditService.logEvent({
                type: content.type,
                payload: content.payload,
                source: 'cart-service',
                timestamp: content.timestamp
            });
            channel.ack(msg);
        }
    });
}
