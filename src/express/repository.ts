import * as mongoose from 'mongoose';
import mergedObjModel from '../mongo/model';
import mergedObj from '../types/mergedObject';

export const getAll = (): mongoose.QueryCursor<mergedObj> => {
    return mergedObjModel.find({}).lean().cursor();
};

export const getBySource = (source: string): mongoose.QueryCursor<mergedObj> => {
    const query = {};
    query[source] = { $exists: true };
    return mergedObjModel.find(query).lean().cursor();
};

export const getByIdentifier = async (identifier: string): Promise<mergedObj> => {
    return await mergedObjModel
        .findOne({
            $or: [{ 'identifiers.identityCard': identifier }, { 'identifiers.personalNumber': identifier }, { 'identifiers.goalUserId': identifier }],
        })
        .lean();
};

export const getByDIBySource = async (source: string, digitalIdentityUniqueId: string): Promise<mergedObj> => {
    const query = [];
    const fieldToFilter = `${source}.record.userID`;
    query[fieldToFilter] = digitalIdentityUniqueId;
    return await mergedObjModel.findOne(query).lean();
};

export const getUpdatedAfter = (date: Date): mongoose.QueryCursor<mergedObj> => {
    return mergedObjModel
        .find({ updatedAt: { $gte: date } })
        .lean()
        .cursor();
};
