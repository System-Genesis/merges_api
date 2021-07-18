import mergedObjModel from '../mongo/model';
import mergedObj from '../types/mergedObject';

export const getAll = async (): Promise<mergedObj[]> => {
    return await mergedObjModel.find({});
};

export const getBySource = async (source: string): Promise<mergedObj[]> => {
    const query = {};
    query[source] = { $exists: true };
    return await mergedObjModel.find(query);
};

export const getByIdentifier = async (identifier: string): Promise<mergedObj> => {
    return await mergedObjModel.findOne({
        $or: [{ 'identifiers.identityCard': identifier }, { 'identifiers.personalNumber': identifier }, { 'identifiers.goalUserId': identifier }],
    });
};

export const getUpdatedAfter = async (date: Date): Promise<mergedObj | mergedObj[]> => {
    return await mergedObjModel.find({ updatedAt: { $gte: date } });
};