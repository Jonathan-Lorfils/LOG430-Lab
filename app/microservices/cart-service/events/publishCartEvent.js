import amqplib from 'amqplib';
import { randomUUID } from 'crypto';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE = 'cart.events';

export async function publishCartEvent(type, payload) {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    const event = {
        id: randomUUID(),
        type,
        timestamp: new Date().toISOString(),
        payload,
    };

    channel.publish(EXCHANGE, `cart.${type}`, Buffer.from(JSON.stringify(event)));

    await channel.close();
    await connection.close();
}
