import * as Joi from 'joi';
import SOURCES from '../../config/sources';

// /date/:dateMS
export const updatedAfterSchema = Joi.object({
    query: {},
    body: {},
    params: {
        dateMS: Joi.date(),
    },
});

// /source/:source
export const sourceSchema = Joi.object({
    body: {},
    query: {},
    params: {
        source: Joi.string().valid(...SOURCES),
    },
});
