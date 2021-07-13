/* eslint-disable no-console */
import * as mongoose from 'mongoose';
import config from '../config';
import sendLog from '../logger';

const { mongo } = config;

export default async () => {
    sendLog('info', 'Connecting to Mongo...', true);

    await mongoose.connect(mongo.uri);

    sendLog('info', 'Mongo connection established', true);
};
