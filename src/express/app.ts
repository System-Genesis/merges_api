import loggerGenesis from 'logger-genesis';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import recoveryRouter from './routes/recovery';
import getRouter from './routes/get';
import config from '../config/index';
import { errorMiddleware } from './error';

require('dotenv').config();

const { port } = config.server || 6060;

export default () => {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logger('dev'));

    app.use('/recovery', recoveryRouter);
    app.use('/get', getRouter);

    app.use(errorMiddleware);

    app.use('/isAlive', (_req, res) => {
        res.status(200).send('alive');
    });

    app.use('*', (_req, res) => {
        res.status(404).send('Invalid Route');
    });

    app.listen(port, () => {
        loggerGenesis.info(false, 'SYSTEM', `listening at http://localhost:${port}`, `listening at http://localhost:${port}`);
    });
};
