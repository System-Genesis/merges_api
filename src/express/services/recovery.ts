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
    if (records) sendRecordsToQueue(records);
    return records.length;
};

export const bySource = async (source: string): Promise<number> => {
    const records = (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);
    if (records) sendRecordsToQueue(records);
    return records.length;
};

export const byIdentifier = async (identifier: string): Promise<mergedObj> => {
    const entity = await repo.getByIdentifier(identifier);
    if (entity) sendRecordsToQueue([entity]);
    return entity;
};

export const updatedAfter = async (dateMS: string): Promise<number> => {
    const records = await repo.getUpdatedAfter(new Date(dateMS));
    if (records) sendRecordsToQueue(records);
    return records.length;
};
