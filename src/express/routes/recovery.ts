import * as express from 'express';
import { Request, Response } from 'express';
import * as service from '../service';
import RUN_TYPES from '../../config/runTypes';
import requestHandler from '../requestHandler';

const router = express.Router();

router.post('', async (_req: Request, res: Response): Promise<void> => {
    requestHandler(service.all, res, RUN_TYPES.recovery);
});

router.post('/entity/:identifier', async (req: Request, res: Response): Promise<void> => {
    requestHandler(service.byIdentifier, res, req.params.identifier, RUN_TYPES.recovery);
});

router.post('/source/:source', async (req: Request, res: Response): Promise<void> => {
    requestHandler(service.bySource, res, req.params.source, RUN_TYPES.recovery);
});

router.post('/date/:dateMS', async (req: Request, res: Response): Promise<void> => {
    requestHandler(service.updatedAfter, res, req.params.dateMS, RUN_TYPES.recovery);
});

export default router;
