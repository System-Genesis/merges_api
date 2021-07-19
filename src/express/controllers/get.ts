import { Request, Response } from 'express';
import * as service from '../services/get';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.getAll());
};

export const getByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getByIdentifier(req.params.identifier));
};

export const getBySource = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getBySource(req.params.source));
};

export const getUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getUpdatedAfter(req.params.dateMS));
};
