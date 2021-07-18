import * as express from 'express';
import { wrapController } from '../wraps';
import * as controller from '../controllers/recovery';

const router = express.Router();

router.post('', wrapController(controller.recoveryAll));

router.post('/entity/:identifier', wrapController(controller.recoveryByIdentifier));

router.post('/source/:source', wrapController(controller.recoveryBySource));

router.post('/date/:dateMS', wrapController(controller.recoveryUpdatedAfter));

export default router;
