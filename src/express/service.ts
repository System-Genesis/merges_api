import mergedObj from '../types/mergedObject';
import * as repo from './repository';
import { sendToSelectorQueue } from '../rabbit';
import runTypes from '../config/runTypes';

const sendRecordsToQueue = (mergedObjects: mergedObj[]) => {
    mergedObjects.forEach((obj) => {
        sendToSelectorQueue(obj);
    });
};

const handleRecordsByRunType = (records: mergedObj[], runType: runTypes): number | mergedObj[] => {
    if (runType === runTypes.recovery) {
        sendRecordsToQueue(records);
        return records.length;
    }
    return records;
};

export const all = async (runType: runTypes): Promise<number | mergedObj[]> => {
    const allRecords = await repo.getAll();
    return handleRecordsByRunType(allRecords, runType);
};

export const bySource = async (source: string, runType: runTypes): Promise<number | mergedObj[]> => {
    const records = (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);
    return handleRecordsByRunType(records, runType);
};

export const byIdentifier = async (identifier: string): Promise<mergedObj> => {
    const entity = await repo.getByIdentifier(identifier);
    sendRecordsToQueue([entity]);
    return entity;
};

export const updatedAfter = async (dateMS: string, runType: runTypes): Promise<number | mergedObj[]> => {
    let records = await repo.getUpdatedAfter(new Date(dateMS));
    records = Array.isArray(records) ? records : [records];
    return handleRecordsByRunType(records, runType);
};
