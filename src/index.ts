import initializeMongo from './mongo/initializeMongo';
import initializeExpress from './express/app';
import initializeRabbit from './rabbit';
import sendLog from './logger';

const main = async () => {
    await initializeMongo();

    await initializeRabbit();

    initializeExpress();
};

main().catch((err) =>
    sendLog('error', 'Unknown error', true, {
        msg: err.message,
    }),
);
