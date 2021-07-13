import * as express from 'express';
import * as bodyParser from 'body-parser';
import sendLog from '../logger';
import runRouter from './routes/run';
import getRouter from './routes/get';
import config from '../config/index';

require('dotenv').config();

const { port } = config.server || 6060;

export default () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/run', runRouter);
    app.use('/get', getRouter);

    app.listen(port, () => {
        sendLog('info', `listening at http://localhost:${port}`, true);
    });
};
