import * as mongoose from 'mongoose';
import logger from 'logger-genesis';
import config from '../config';

const { mongo } = config;

export default async () => {
    logger.logInfo(true, 'Connecting to Mongo', 'SYSTEM', 'Connecting to Mongo');

    await mongoose.connect(mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    logger.logInfo(false, 'Mongo connection established', 'SYSTEM', 'Mongo connection established');
};
