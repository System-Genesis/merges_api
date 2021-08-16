import { Request, Response } from 'express';
import * as service from '../services/get';
import { sourcesMap } from '../../config/sources';

const map = new Map(sourcesMap);

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.getAll());
};

export const getByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getByIdentifier(req.params.identifier));
};

export const getBySource = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getBySource(map.get(req.params.source)!));
};

export const getUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getUpdatedAfter(req.params.dateMS));
};
