import * as winston from 'winston';
import logObject from './types/log';
import { sendToLogQueue } from './rabbit';

const { config, format } = winston;

const logger = winston.createLogger({
    levels: config.npm.levels,

    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.splat(),
        format.simple(),
    ),
    transports: [new winston.transports.Console()],
});

export default (level: string, message: string, localLog: boolean, extraFields?: any): void => {
    const logToSend: logObject = {
        level,
        message,
        system: 'Traking',
        service: 'Merges API',
    };

    if (extraFields) {
        logToSend.extraFields = extraFields;
    }

    if (!localLog) {
        sendToLogQueue(logToSend);
    }

    logger[level](`${message} ${!extraFields ? '' : JSON.stringify(extraFields)}`);
};
