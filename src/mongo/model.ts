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
        es: { type: [], require: false, default: undefined },
        sf: { type: [], require: false, default: undefined },
        city: { type: [], require: false, default: undefined },
        adnn: { type: [], require: false, default: undefined },
        mir: { type: [], require: false, default: undefined },

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
