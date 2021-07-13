import * as mongoose from 'mongoose';
import config from '../config';
import mergedObjectType from '../types/mergedObject';

const { mongo } = config;

const mergedObject = new mongoose.Schema<mergedObjectType>({
    aka: [],
    eightSocks: [],
    sf: [],
    city: [],
    adNn: [],
    adS: [],
    mir: [],

    identifiers: {
        type: {
            personalNumber: String,
            identityCard: String,
            goalUserId: String,
        },
        require: true,
    },

    updatedAt: { type: Date, required: true },
});

const mergedObjModel = mongoose.model(mongo.collectionName, mergedObject);

export default mergedObjModel;
