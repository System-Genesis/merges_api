/* eslint-disable no-console */
import menash from 'menashmq';
import logger from 'logger-genesis';
import config from './config';
import mergedObjectType from './types/mergedObject';

const { rabbit } = config;

require('dotenv').config();

/**
 * Connects to RabbitMQ and declaring the queues
 */
export default async (): Promise<void> => {
    console.log('Connecting to Rabbit...');

    await menash.connect(rabbit.uri, rabbit.retryOptions);

    console.log('Rabbit connected');

    await menash.declareQueue(rabbit.selectorQueue, { durable: true });

    console.log('Rabbit initialized');
};

/**
 * Sends the object to the selector queue.
 * @param { mergedObjectType } mergedObject - The object pulled from the DB.
 */
export const sendToSelectorQueue = (mergedObject: mergedObjectType): void => {
    logger.info(
        false,
        'APP',
        'Sending object to selector queue',
        `Sending merged object to selector with identifiers${JSON.stringify(mergedObject.identifiers)}`,
    );
    menash.send(rabbit.selectorQueue, mergedObject, { persistent: true });
};
