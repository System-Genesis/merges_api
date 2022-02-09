import { QueryCursor } from 'mongoose';
import mergedObj from '../../types/mergedObject';
import * as repo from '../repository';

export const getAll = (): QueryCursor<mergedObj> => repo.getAll();

export const getBySource = (source: string): QueryCursor<mergedObj> => repo.getBySource(source);

export const getByIdentifier = async (identifier: string): Promise<mergedObj> => await repo.getByIdentifier(identifier);

export const getByDIBySource = async (source: string, digitalIdentityUniqueId: string): Promise<mergedObj> =>
    await repo.getByDIBySource(source, digitalIdentityUniqueId);

export const getUpdatedAfter = (dateMS: string): QueryCursor<mergedObj> => repo.getUpdatedAfter(new Date(dateMS));
