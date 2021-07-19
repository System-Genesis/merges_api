import * as Joi from 'joi';
import SOURCES from '../../config/sources';

// /date/:dateMS
export const updatedAfterSchema = Joi.object({
    params: {
        dateMS: Joi.date(),
    },
});

// /source/:source
export const sourceSchema = Joi.object({
    params: {
        source: Joi.string().valid(...SOURCES),
    },
});
