import amqplib from 'amqplib';
import { randomUUID } from 'crypto';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE = 'cart.events';

export async function publishCartEvent(type, aggregateId, payload, expectedVersion) {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    const event = {
        id: randomUUID(),
        type,
        aggregateId,
        expectedVersion,
        timestamp: new Date().toISOString(),
        payload,
    };

    channel.publish(
        EXCHANGE,
        `cart.${type}`, // routing key
        Buffer.from(JSON.stringify(event)),
        { persistent: true }
    );

    await channel.close();
    await connection.close();
}
