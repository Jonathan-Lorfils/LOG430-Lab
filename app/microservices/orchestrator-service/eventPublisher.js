import amqp from 'amqplib';

let channel = null;
let connection = null;

const MAX_RETRIES = 15;
const RETRY_DELAY_MS = 3000;

export const connectRabbitMQ = async () => {
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            connection = await amqp.connect('amqp://rabbitmq:5672');
            channel = await connection.createChannel();
            console.log('Connexion RabbitMQ établie (orchestrator)');
            break;
        } catch (err) {
            attempts++;
            console.warn(`Tentative de connexion RabbitMQ ${attempts}/${MAX_RETRIES} échouée. Réessai dans ${RETRY_DELAY_MS / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }

    if (!channel) {
        console.error('Impossible de se connecter à RabbitMQ après plusieurs tentatives');
        process.exit(1); // ou tu peux laisser tourner le service sans Rabbit
    }
};

export const publishEvent = async (queue, payload) => {
    if (!channel) throw new Error('RabbitMQ channel non initialisé');
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
};
