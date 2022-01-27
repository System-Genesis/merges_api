import { Request, Response } from 'express';
import logger from 'logger-genesis';
import * as service from '../services/recovery';
import { sourcesMap } from '../../config/sources';

const map: Map<string, string> = new Map<string, string>(sourcesMap);

export const recoveryAll = async (_req: Request, res: Response): Promise<void> => {
    const count = await service.all();
    res.status(count ? 200 : 404).json(count || { message: 'Not Found' });
    logger.info(true, 'SYSTEM', 'POST request succeeded - All', _req.originalUrl);
};

export const recoveryByIdentifier = async (req: Request, res: Response): Promise<void> => {
    const entity = await service.byIdentifier(req.params.identifier);
    res.status(entity ? 200 : 404).json(entity || { message: 'Not Found' });
    logger.info(true, 'SYSTEM', 'POST request succeeded - Identifier', req.originalUrl, { id: req.params.identifier });
};

export const recoveryByDIBySource = async (req: Request, res: Response): Promise<void> => {
    const entity = await service.byDIBySource(map.get(req.params.source)!, req.params.digitalIdentityUniqueId);
    res.status(entity ? 200 : 404).json(entity || { message: 'Not Found' });
    logger.info(true, 'SYSTEM', 'POST request succeeded - DI By Source', req.originalUrl, { id: req.params.identifier });
};

export const recoveryBySource = async (req: Request, res: Response): Promise<void> => {
    const count = await service.bySource(map.get(req.params.source)!);
    res.status(count ? 200 : 404).json(count || { message: 'Not Found' });
    logger.info(true, 'SYSTEM', 'POST request succeeded - Source', req.originalUrl);
};

export const recoveryUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    const count = await service.updatedAfter(req.params.dateMS);
    res.status(count ? 200 : 404).json(count || { message: 'Not Found' });
    logger.info(true, 'SYSTEM', 'POST request succeeded - Updated From', req.originalUrl);
};
