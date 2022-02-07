import * as express from 'express';
import { wrapController } from '../wraps';
import * as controller from '../controllers/recovery';
import validateRequest from '../joi/joi';
import { sourceSchema, DIBySourceSchema } from '../joi/validator.schema';

const router = express.Router();

router.post('', wrapController(controller.recoveryAll));

router.post('/entity/:identifier', wrapController(controller.recoveryByIdentifier));

router.post('/source/:source', validateRequest(sourceSchema), wrapController(controller.recoveryBySource));

router.post(
    '/source/:source/digitalIdentity/:digitalIdentityUniqueId',
    validateRequest(DIBySourceSchema),
    wrapController(controller.recoveryByDIBySource),
);

router.post('/date/:dateMS', wrapController(controller.recoveryUpdatedAfter));

export default router;
