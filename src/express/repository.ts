import * as mongoose from 'mongoose';
import mergedObjModel from '../mongo/model';
import mergedObj from '../types/mergedObject';

/**
 * Pulls all the documents in the DB.
 * @returns { mongoose.QueryCursor<mergedObj> } - Stream of the pulled documents.
 */
export const getAll = (): mongoose.QueryCursor<mergedObj> => {
    return mergedObjModel.find({}).lean().cursor();
};

/**
 * Pulls all the documents that contains an array of record of the given source.
 * @param { string } source - The source
 * @returns { mongoose.QueryCursor<mergedObj> } - Stream of the pulled documents.
 */
export const getBySource = (source: string): mongoose.QueryCursor<mergedObj> => {
    const query = {};
    query[source] = { $exists: true };
    return mergedObjModel.find(query).lean().cursor();
};

/**
 * Pulls the document with an identifier with value of the given identifier.
 * @param { string } identifier - The identifier
 * @returns { mongoose.QueryCursor<mergedObj> } - Promise of the pulled document.
 */
export const getByIdentifier = async (identifier: string): Promise<mergedObj> => {
    return await mergedObjModel
        .findOne({
            $or: [
                { 'identifiers.identityCard': identifier },
                { 'identifiers.personalNumber': identifier },
                { 'identifiers.goalUserId': identifier },
                { 'identifiers.employeeId': identifier },
            ],
        })
        .lean();
};

/**
 * Pulls a document that contains a record with the given digital identity from the given source.
 * @param { string } source - The source which the digital identity is from.
 * @param digitalIdentityUniqueId - The searched digital identity uniqueId
 * @returns { mongoose.QueryCursor<mergedObj> } - Promise of the pulled document.
 */
export const getByDIBySource = async (source: string, digitalIdentityUniqueId: string): Promise<mergedObj> => {
    const query = {};
    const fieldToFilter = `${source}.record.userID`;
    query[fieldToFilter] = { $regex: `^${digitalIdentityUniqueId.toLowerCase()}` };
    return await mergedObjModel.findOne(query).lean();
};

/**
 * Pulls the documents that have been updated from the given date till today.
 * @param { Date } date - The date
 * @returns { mongoose.QueryCursor<mergedObj> } - Stream of the pulled documents.
 */
export const getUpdatedAfter = (date: Date): mongoose.QueryCursor<mergedObj> => {
    return mergedObjModel
        .find({ updatedAt: { $gte: date } })
        .lean()
        .cursor();
};
