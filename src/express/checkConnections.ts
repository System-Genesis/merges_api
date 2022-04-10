import menash from 'menashmq';
import logger from 'logger-genesis';
import * as mongoose from 'mongoose';

export default () => {
    return menash.isReady && logger.isConnected() && mongoose.connection.readyState === 1;
};
