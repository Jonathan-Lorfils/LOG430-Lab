import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Crée le dossier logs s’il n’existe pas
const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        // Console pour dev, avec format lisible
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, ...rest }) => {
                    const base = `${timestamp} ${level}:`;
                    const extra = message || JSON.stringify(rest);
                    return `${base} ${extra}`;
                })
            )
        }),

        // Tous les événements (structurés en JSON)
        new winston.transports.File({
            filename: path.join(logDir, 'events.json'),
            level: 'info'
        }),

        // Fichier d’erreurs uniquement
        new winston.transports.File({
            filename: path.join(logDir, 'errors.json'),
            level: 'error'
        })
    ]
});

export default logger;
