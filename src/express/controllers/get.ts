import { Request, Response } from 'express';
import * as service from '../services/get';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.all());
};

export const getByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.byIdentifier(req.params.identifier));
};

export const getBySource = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.bySource(req.params.source));
};

export const getUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.updatedAfter(req.params.dateMS));
};
