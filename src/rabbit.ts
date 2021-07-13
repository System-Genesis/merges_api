import menash from 'menashmq';
import config from './config';
import logObject from './types/log';
import mergedObjectType from './types/mergedObject';
import sendLog from './logger';

const { rabbit } = config;

require('dotenv').config();

export default async (): Promise<void> => {
    sendLog('info', 'Connecting to Rabbit...', true);

    await menash.connect(rabbit.uri, rabbit.retryOptions);

    sendLog('info', 'Rabbit connected', true);

    await menash.declareQueue(rabbit.logQueue);
    await menash.declareQueue(rabbit.selectorQueue);

    sendLog('info', 'Rabbit initialized', true);
};

export const sendToLogQueue = (logToSend: logObject): void => {
    menash.send(rabbit.logQueue, logToSend);
};

export const sendToSelectorQueue = (mergedObject: mergedObjectType): void => {
    sendLog('info', 'Sending merged object to selector', false, {
        identifier: mergedObject.identifiers.identityCard || mergedObject.identifiers.personalNumber || mergedObject.identifiers.goalUser,
    });
    menash.send(rabbit.selectorQueue, mergedObject);
};
