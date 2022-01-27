import * as Joi from 'joi';
import SOURCES from '../../config/sources';

// /date/:dateMS
export const updatedAfterSchema = Joi.object({
    params: {
        dateMS: Joi.number().max(new Date().getTime()),
    },
});

// /source/:source
export const sourceSchema = Joi.object({
    params: {
        source: Joi.string().valid(...SOURCES),
    },
});

// /source/:source/digitalIdentity/:digitalIdentityUniqueId
export const DIBySourceSchema = Joi.object({
    params: {
        source: Joi.string().valid(...SOURCES),
        digitalIdentityUniqueId: Joi.string(),
    },
});
