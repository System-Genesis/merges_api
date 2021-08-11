/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mergedObjModel from '../mongo/model';
import mergedObj from '../types/mergedObject';

export const getAll = async (): Promise<mergedObj[]> => {
    return await mergedObjModel.find({}).lean();
};

export const getBySource = async (source: string): Promise<mergedObj[]> => {
    const query = {};
    query[source] = { $exists: true };
    return await mergedObjModel.find(query).lean();
};

export const getByIdentifier = async (identifier: string): Promise<mergedObj> => {
    return await mergedObjModel
        .findOne({
            $or: [{ 'identifiers.identityCard': identifier }, { 'identifiers.personalNumber': identifier }, { 'identifiers.goalUserId': identifier }],
        })
        .lean();
};

export const getUpdatedAfter = async (date: Date): Promise<mergedObj[]> => {
    return await mergedObjModel.find({ updatedAt: { $gte: date } }).lean();
};
