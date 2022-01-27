/* eslint-disable no-console */
import menash from 'menashmq';
import logger from 'logger-genesis';
import config from './config';
import logObject from './types/log';
import mergedObjectType from './types/mergedObject';

const { rabbit } = config;

require('dotenv').config();

export default async (): Promise<void> => {
    console.log('Connecting to Rabbit...');

    await menash.connect(rabbit.uri, rabbit.retryOptions);

    console.log('Rabbit connected');

    await menash.declareQueue(rabbit.selectorQueue, { durable: true });

    console.log('Rabbit initialized');
};

export const sendToLogQueue = (logToSend: logObject): void => {
    menash.send(rabbit.logQueue, logToSend, { persistent: true });
};

export const sendToSelectorQueue = (mergedObject: mergedObjectType): void => {
    logger.info(
        false,
        'APP',
        'Sending object to selector queue',
        `Sending merged object to selector with identifiers${JSON.stringify(mergedObject.identifiers)}`,
    );
    menash.send(rabbit.selectorQueue, mergedObject, { persistent: true });
};
