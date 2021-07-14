import mergedObj from '../types/mergedObject';
import * as repo from './repository';
import { sendToSelectorQueue } from '../rabbit';
import RUN_TYPES from '../config/runTypes';

const sendRecordsToQueue = (mergedObjects: mergedObj[]) => {
    mergedObjects.forEach((obj) => {
        sendToSelectorQueue(obj);
    });
};

const handleRecordsByRunType = (records: mergedObj[], runType: RUN_TYPES): number | mergedObj[] => {
    if (runType === RUN_TYPES.RECOVERY) {
        sendRecordsToQueue(records);
        return records.length;
    }
    return records;
};

export const all = async (runType: RUN_TYPES): Promise<number | mergedObj[]> => {
    const allRecords = await repo.getAll();
    return handleRecordsByRunType(allRecords, runType);
};

export const bySource = async (source: string, runType: RUN_TYPES): Promise<number | mergedObj[]> => {
    const records = (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);
    return handleRecordsByRunType(records, runType);
};

export const byIdentifier = async (identifier: string, runType: RUN_TYPES): Promise<mergedObj> => {
    const entity = await repo.getByIdentifier(identifier);
    if (runType === RUN_TYPES.GET) sendRecordsToQueue([entity]);
    return entity;
};

export const updatedAfter = async (dateMS: string, runType: RUN_TYPES): Promise<number | mergedObj[]> => {
    let records = await repo.getUpdatedAfter(new Date(dateMS));
    records = Array.isArray(records) ? records : [records];
    return handleRecordsByRunType(records, runType);
};
