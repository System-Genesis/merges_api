import * as env from 'env-var';
import './dotenv';

const config = {
    server: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asString(),
        collectionName: env.get('COLLECTION_NAME').required().asString(),
    },
    rabbit: {
        uri: env.get('RABBIT_URI').required().asUrlString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
        selectorQueue: env.get('PRODUCE_QUEUE').required().asString(),
        logQueue: env.get('LOG_QUEUE').required().asString(),
    },
    systemName: env.get('SYSTEM_NAME').required().asString(),
    serviceName: env.get('SERVICE_NAME').required().asString(),
};

export default config;
