import * as express from 'express';
import * as bodyParser from 'body-parser';
import sendLog from '../logger';
import router from './router';
import config from '../config/index';

require('dotenv').config();

const { server } = config;

export default () => {
    const app = express();
    const { port } = server; // default port to listen

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(router);

    app.listen(port, () => {
        sendLog('info', `listening at http://localhost:${port}`, true);
    });
};
