import mergedObj from '../../types/mergedObject';
import * as repo from '../repository';

export const all = async (): Promise<mergedObj[]> => await repo.getAll();

export const bySource = async (source: string): Promise<mergedObj[]> => (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);

export const byIdentifier = async (identifier: string): Promise<mergedObj> => await repo.getByIdentifier(identifier);

export const updatedAfter = async (dateMS: string): Promise<mergedObj[]> => {
    let records = await repo.getUpdatedAfter(new Date(dateMS));
    records = Array.isArray(records) ? records : [records];
    return records;
};
