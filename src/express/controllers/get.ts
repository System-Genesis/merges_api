import { Request, Response } from 'express';
import logger from 'logger-genesis';
import * as JSONStream from 'JSONStream';
import { QueryCursor } from 'mongoose';
import * as service from '../services/get';
import { sourcesMap } from '../../config/sources';
import mergedObj from '../../types/mergedObject';

const map: Map<string, string> = new Map<string, string>(sourcesMap);

const pipeToRes = (streamProvider: QueryCursor<mergedObj>, res: Response): void => {
    res.set('Content-Type', 'application/json');

    // let count = 0;
    // streamProvider.pipe(JSONStream.stringify());
    // streamProvider.on('data', (chunk) => {
    //     count += 1;
    //     res.write(JSON.stringify(chunk));
    // });

    // streamProvider.on('end', () => {
    //     if (count === 0) res.status(404).json({ message: 'Not Found' });
    //     res.end();
    // });

    const arr: mergedObj[] = [];
    streamProvider.pipe(JSONStream.stringify());
    streamProvider.on('data', (chunk) => {
        arr.push(JSON.parse(JSON.stringify(chunk)));
    });

    streamProvider.on('end', () => {
        if (arr.length === 0) res.status(404).json({ message: 'Not Found' });
        else res.json(arr);
    });
};

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    const streamProvider: QueryCursor<mergedObj> = service.getAll();
    pipeToRes(streamProvider, res);
    logger.info(false, 'SYSTEM', 'GET request succeeded - All', _req.originalUrl);
};

export const getByIdentifier = async (req: Request, res: Response): Promise<void> => {
    const entity = await service.getByIdentifier(req.params.identifier);
    res.status(entity ? 200 : 404).json(entity || { message: 'Not Found' });
    logger.info(false, 'SYSTEM', 'GET request succeeded - Identifier', req.originalUrl, { id: req.params.identifier });
};

export const getByDIBySource = async (req: Request, res: Response): Promise<void> => {
    const entity = await service.getByDIBySource(map.get(req.params.source)!, req.params.digitalIdentityUniqueId);
    res.status(entity ? 200 : 404).json(entity || { message: 'Not Found' });
    logger.info(false, 'SYSTEM', 'GET request succeeded - DI By Source', req.originalUrl, { id: req.params.identifier });
};

export const getBySource = async (req: Request, res: Response): Promise<void> => {
    const streamProvider: QueryCursor<mergedObj> = service.getBySource(map.get(req.params.source)!);
    pipeToRes(streamProvider, res);
    logger.info(false, 'SYSTEM', 'GET request succeeded - Source', req.originalUrl);
};

export const getUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    const streamProvider: QueryCursor<mergedObj> = service.getUpdatedAfter(req.params.dateMS);
    pipeToRes(streamProvider, res);
    logger.info(false, 'SYSTEM', 'GET request succeeded - Updated From', req.originalUrl);
};
