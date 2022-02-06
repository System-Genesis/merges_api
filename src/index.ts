import logger from 'logger-genesis';
import initializeMongo from './mongo/initializeMongo';
import initializeExpress from './express/app';
import initializeRabbit from './rabbit';
import initializeLogger from './logger';

/**
 * The main function.
 * Calls all the initialization functions.
 */
const main = async () => {
    await initializeRabbit();

    await initializeLogger();

    await initializeMongo();

    initializeExpress();
};

main().catch((err) => {
    logger.error(false, 'SYSTEM', 'Unknown error', err.message);
});
