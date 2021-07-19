import * as express from 'express';
import sendLog from '../logger';

export class ServiceError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export const errorMiddleware = (error: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error.name === 'ValidationError') {
        res.status(400).send({
            type: error.name,
            message: error.message,
        });
    } else if (error instanceof ServiceError) {
        res.status(error.code).send({
            type: error.name,
            message: error.message,
        });
    } else {
        res.status(500).send({
            type: error.name,
            message: error.message,
        });
    }

    sendLog('error', 'Unknown error', false, {
        type: error.name,
        msg: error.message,
    });

    next();
};
