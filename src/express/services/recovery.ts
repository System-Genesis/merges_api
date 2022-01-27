/* eslint-disable no-await-in-loop */
import { QueryCursor } from 'mongoose';
import { sendToSelectorQueue } from '../../rabbit';
import mergedObj from '../../types/mergedObject';
import * as repo from '../repository';

const sendRecordsToQueue = async (streamProvider: QueryCursor<mergedObj>): Promise<number> => {
    let count = 0;
    for (let doc = await streamProvider.next(); doc != null; doc = await streamProvider.next()) {
        sendToSelectorQueue(doc);
        count += 1;
    }

    return count;
};

export const all = async (): Promise<number> => {
    const streamProvider: QueryCursor<mergedObj> = repo.getAll();
    return await sendRecordsToQueue(streamProvider);
};

export const bySource = async (source: string): Promise<number> => {
    const streamProvider: QueryCursor<mergedObj> = repo.getBySource(source);
    return await sendRecordsToQueue(streamProvider);
};

export const byIdentifier = async (identifier: string): Promise<mergedObj | null> => {
    const entity = await repo.getByIdentifier(identifier);
    if (!entity) {
        return null;
    }
    sendToSelectorQueue(entity);
    return entity;
};

export const updatedAfter = async (dateMS: string): Promise<number> => {
    const streamProvider: QueryCursor<mergedObj> = repo.getUpdatedAfter(new Date(dateMS));
    return await sendRecordsToQueue(streamProvider);
};
