import * as express from 'express';
import { Request, Response } from 'express';
import * as service from '../service';
import runTypes from '../../config/runTypes';

const router = express.Router();

router.post('', async (_req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.all(runTypes.recovery));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/entity/:identifier', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.byIdentifier(req.params.identifier));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/source/:source', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.bySource(req.params.source, runTypes.recovery));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/date/:dateMS', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(await service.updatedAfter(req.params.dateMS, runTypes.recovery));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
