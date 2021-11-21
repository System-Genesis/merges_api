import { Request, Response } from 'express';
import logger from 'logger-genesis';
import * as service from '../services/get';
import { sourcesMap } from '../../config/sources';

const map: Map<string, string> = new Map<string, string>(sourcesMap);
export const getAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.getAll());
    logger.logInfo(false, 'GET request succeeded - All', 'SYSTEM', _req.originalUrl);
};

export const getByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getByIdentifier(req.params.identifier));
    logger.logInfo(false, 'GET request succeeded - Identifier', 'SYSTEM', req.originalUrl, { id: req.params.identifier });
};

export const getBySource = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getBySource(map.get(req.params.source)!));
    logger.logInfo(false, 'GET request succeeded - Source', 'SYSTEM', req.originalUrl);
};

export const getUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getUpdatedAfter(req.params.dateMS));
    logger.logInfo(false, 'GET request succeeded - Updated From', 'SYSTEM', req.originalUrl);
};
