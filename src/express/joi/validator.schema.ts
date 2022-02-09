import * as Joi from 'joi';
import SOURCES from '../../config/sources';

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

export const dateSchema = Joi.object({
    params: {
        dateMS: Joi.date(),
    },
});
