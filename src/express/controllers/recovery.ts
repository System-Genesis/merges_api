import { Request, Response } from 'express';
import logger from 'logger-genesis';
import * as service from '../services/recovery';
import { sourcesMap } from '../../config/sources';

const map: Map<string, string> = new Map<string, string>(sourcesMap);

export const recoveryAll = async (_req: Request, res: Response): Promise<void> => {
    res.json((await service.all()) || 'Not Found');
    logger.logInfo(false, 'POST request succeeded - All', 'SYSTEM', _req.originalUrl);
};

export const recoveryByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send((await service.byIdentifier(req.params.identifier)) || 'Not Found');
    logger.logInfo(false, 'POST request succeeded - Identifier', 'SYSTEM', req.originalUrl, { id: req.params.identifier });
};

export const recoveryBySource = async (req: Request, res: Response): Promise<void> => {
    res.json((await service.bySource(map.get(req.params.source)!)) || 'Not Found');
    logger.logInfo(false, 'POST request succeeded - Source', 'SYSTEM', req.originalUrl);
};

export const recoveryUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.json((await service.updatedAfter(req.params.dateMS)) || 'Not Found');
    logger.logInfo(false, 'POST request succeeded - Updated From', 'SYSTEM', req.originalUrl);
};
