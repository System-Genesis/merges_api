import mergedObj from '../types/mergedObject';
import * as repo from './repository';
import { sendToSelectorQueue } from '../rabbit';

const sendRecordsToSelector = (mergedObjects: mergedObj[]) => {
    mergedObjects.forEach((obj) => {
        sendToSelectorQueue(obj);
    });
};
export const getAll = async (): Promise<number> => {
    const allRecords = await repo.getAll();
    sendRecordsToSelector(allRecords);
    return allRecords.length;
};

export const getBySource = async (source: string): Promise<number> => {
    const res = (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);
    sendRecordsToSelector(res);
    return res.length;
};

export const getByIdentifier = async (identifier: string): Promise<mergedObj> => {
    const entity = await repo.getByIdentifier(identifier);
    sendRecordsToSelector([entity]);
    return entity;
};

export const getUpdatedAfter = async (dateMS: string): Promise<number> => {
    const res = await repo.getUpdatedAfter(new Date(dateMS));
    sendRecordsToSelector(Array.isArray(res) ? res : [res]);
    return Array.isArray(res) ? res.length : 1;
};
