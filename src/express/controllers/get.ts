import { Request, Response } from 'express';
import * as service from '../service';
import RUN_TYPES from '../../config/runTypes';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.all(RUN_TYPES.GET));
};

export const getByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.byIdentifier(req.params.identifier, RUN_TYPES.GET));
};

export const getBySource = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.bySource(req.params.source, RUN_TYPES.GET));
};

export const getUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.updatedAfter(req.params.dateMS, RUN_TYPES.GET));
};
