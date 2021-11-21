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

    await menash.declareQueue(rabbit.logQueue);
    await menash.declareQueue(rabbit.selectorQueue);

    console.log('Rabbit initialized');
};

export const sendToLogQueue = (logToSend: logObject): void => {
    menash.send(rabbit.logQueue, logToSend);
};

export const sendToSelectorQueue = (mergedObject: mergedObjectType): void => {
    logger.logInfo(true, 'Sending object to selector queue', 'APP', JSON.stringify(mergedObject));
    menash.send(rabbit.selectorQueue, mergedObject);
};
