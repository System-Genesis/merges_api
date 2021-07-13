import * as express from 'express';
import { Request, Response } from 'express';
import * as service from './service';

const router = express.Router();

router.post('', async (_req: Request, res: Response): Promise<void> => {
    try {
        // Send the amount of records
        res.send(await service.getAll());
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/entity/:identifier', async (req: Request, res: Response): Promise<void> => {
    try {
        // Send the entity
        res.send(await service.getByIdentifier(req.params.identifier));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/source/:source', async (req: Request, res: Response): Promise<void> => {
    try {
        // Send the amount of records
        res.send(await service.getBySource(req.params.source));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/date/:dateMS', async (req: Request, res: Response): Promise<void> => {
    try {
        // Send the amount of records
        res.send(await service.getUpdatedAfter(req.params.dateMS));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
