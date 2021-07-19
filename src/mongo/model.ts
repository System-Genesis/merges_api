/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import config from '../config';
import mergedObjectType from '../types/mergedObject';

const { mongo } = config;

const mergedObject = new mongoose.Schema<mergedObjectType>(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true, select: false },
        aka: { type: [], require: false, default: undefined },
        es_name: { type: [], require: false, default: undefined },
        sf_name: { type: [], require: false, default: undefined },
        city_name: { type: [], require: false, default: undefined },
        adNN_name: { type: [], require: false, default: undefined },
        mir_name: { type: [], require: false, default: undefined },

        identifiers: {
            type: {
                personalNumber: String,
                identityCard: String,
                goalUserId: String,
            },
            require: true,
        },

        updatedAt: { type: Date, required: true },
    },
    { versionKey: false },
);

const mergedObjModel = mongoose.model(mongo.collectionName, mergedObject);

export default mergedObjModel;
