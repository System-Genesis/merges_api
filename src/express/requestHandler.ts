import { Response } from 'express';

export default async (func: Function, res: Response, ...params: string[]): Promise<void> => {
    try {
        res.send(await func(...params));
    } catch (err) {
        res.status(500).send(err.message);
    }
};
