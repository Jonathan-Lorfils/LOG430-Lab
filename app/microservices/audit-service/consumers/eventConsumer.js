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
        if (!msg) return;

        try {
            const content = JSON.parse(msg.content.toString());

            await AuditService.logEvent({
                type: content.type || content.eventType,
                payload: content.payload ?? content.data ?? {},
                source: content.source || 'cart-service',
                timestamp: content.timestamp,
                aggregateId: content.aggregateId || content.payload?.cartId,
                expectedVersion: content.expectedVersion
            });

            channel.ack(msg);
        } catch (err) {
            console.error(`Failed to append event: ${err.message}`);
            channel.nack(msg, false, false);
        }
    }, { noAck: false });
}
