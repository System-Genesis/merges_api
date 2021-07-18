import { sendToSelectorQueue } from '../../rabbit';
import mergedObj from '../../types/mergedObject';
import * as repo from '../repository';

const sendRecordsToQueue = (mergedObjects: mergedObj[]): void => {
    mergedObjects.forEach((obj) => {
        sendToSelectorQueue(obj);
    });
};

export const all = async (): Promise<number> => {
    const records = await repo.getAll();
    sendRecordsToQueue(records);
    return records.length;
};

export const bySource = async (source: string): Promise<number> => {
    const records = (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);
    sendRecordsToQueue(records);
    return records.length;
};

export const byIdentifier = async (identifier: string): Promise<mergedObj> => {
    const entity = await repo.getByIdentifier(identifier);
    sendRecordsToQueue([entity]);
    return entity;
};

export const updatedAfter = async (dateMS: string): Promise<number> => {
    let records = await repo.getUpdatedAfter(new Date(dateMS));
    records = Array.isArray(records) ? records : [records];
    sendRecordsToQueue(records);
    return records.length;
};
