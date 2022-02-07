import * as express from 'express';
import { wrapController } from '../wraps';
import * as controller from '../controllers/get';
import validateRequest from '../joi/joi';
import { sourceSchema, DIBySourceSchema } from '../joi/validator.schema';

const router = express.Router();

router.get('', wrapController(controller.getAll));

router.get('/entity/:identifier', wrapController(controller.getByIdentifier));

router.get('/source/:source', validateRequest(sourceSchema), wrapController(controller.getBySource));

router.get('/source/:source/digitalIdentity/:digitalIdentityUniqueId', validateRequest(DIBySourceSchema), wrapController(controller.getByDIBySource));

router.get('/date/:dateMS', wrapController(controller.getUpdatedAfter));

export default router;
