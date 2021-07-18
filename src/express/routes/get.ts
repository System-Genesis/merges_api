import * as express from 'express';
import { wrapController } from '../wraps';
import * as controller from '../controllers/get';

const router = express.Router();

router.get('', wrapController(controller.getAll));

router.get('/entity/:identifier', wrapController(controller.getByIdentifier));

router.get('/source/:source', wrapController(controller.getBySource));

router.get('/date/:dateMS', wrapController(controller.getUpdatedAfter));

export default router;
