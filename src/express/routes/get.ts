import * as express from 'express';
import { Request, Response } from 'express';
import * as service from '../service';
import RUN_TYPES from '../../config/runTypes';

const router = express.Router();

router.get('', async (_req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.all(RUN_TYPES.get));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/entity/:identifier', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.byIdentifier(req.params.identifier, RUN_TYPES.get));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/source/:source', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.bySource(req.params.source, RUN_TYPES.get));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/date/:dateMS', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.updatedAfter(req.params.dateMS, RUN_TYPES.get));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
