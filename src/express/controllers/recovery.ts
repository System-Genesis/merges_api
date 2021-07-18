import { Request, Response } from 'express';
import * as service from '../service';
import RUN_TYPES from '../../config/runTypes';

export const recoveryAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.all(RUN_TYPES.RECOVERY));
};

export const recoveryByIdentifier = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.byIdentifier(req.params.identifier, RUN_TYPES.RECOVERY));
};

export const recoveryBySource = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.bySource(req.params.source, RUN_TYPES.RECOVERY));
};

export const recoveryUpdatedAfter = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.updatedAfter(req.params.dateMS, RUN_TYPES.RECOVERY));
};
