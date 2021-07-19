import mergedObj from '../../types/mergedObject';
import * as repo from '../repository';

export const getAll = async (): Promise<mergedObj[]> => await repo.getAll();

export const getBySource = async (source: string): Promise<mergedObj[]> => (await repo.getBySource(source)).filter((obj) => obj[source].length > 0);

export const getByIdentifier = async (identifier: string): Promise<mergedObj> => await repo.getByIdentifier(identifier);

export const getUpdatedAfter = async (dateMS: string): Promise<mergedObj[]> => await repo.getUpdatedAfter(new Date(parseInt(dateMS, 10)));
