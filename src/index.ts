import logger from 'logger-genesis';
import initializeMongo from './mongo/initializeMongo';
import initializeExpress from './express/app';
import initializeRabbit from './rabbit';
import initializeLogger from './logger';

const main = async () => {
    await initializeMongo();

    await initializeLogger();

    await initializeRabbit();

    initializeExpress();
};

main().catch((err) => {
    logger.logError(false, 'Unknown error', 'SYSTEM', err.message);
});
