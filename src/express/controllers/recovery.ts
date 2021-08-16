import { Request, Response } from 'express';
import * as service from '../services/recovery';
import { sourcesMap } from '../../config/sources';

const map = new Map(sourcesMap);

export const recoveryAll = async (_req: Request, res: Response): Promise<void> => {
    res.json(await service.all());
};

export const recoveryByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.byIdentifier(req.params.identifier));
};

export const recoveryBySource = async (req: Request, res: Response): Promise<void> => {
    res.json(await service.bySource(map.get(req.params.source)!));
};

export const recoveryUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.json(await service.updatedAfter(req.params.dateMS));
};
