import * as mongoose from 'mongoose';
import initializeMongo from '../src/mongo/initializeMongo';
import mergedObj from '../src/types/mergedObject';
import mergedObjModel from '../src/mongo/model';
import * as getService from '../src/express/services/get';

jest.mock('../src/logger', () => {
    return {
        default: jest.fn(),
    };
});

jest.mock('../src/rabbit', () => {
    return {
        sendToSelectorQueue: jest.fn(),
        default: jest.fn(),
    };
});

const obj1: mergedObj = {
    aka: [1],
    es_name: [1],
    mir_name: [1],
    identifiers: {
        personalNumber: '8764234',
        identityCard: '21217486',
    },

    updatedAt: new Date(new Date().getTime() - 10000),
};

const obj2: mergedObj = {
    aka: [2],
    es_name: [],
    city_name: [2],
    identifiers: {
        personalNumber: '8759876',
        identityCard: '215489674',
    },
    updatedAt: new Date(new Date().getTime() - 5000),
};

beforeAll(async () => {
    await initializeMongo();

    await mergedObjModel.deleteMany({});

    await mergedObjModel.create(obj1);
    await mergedObjModel.create(obj2);
});

afterAll(async () => {
    // await mergedObjModel.deleteMany({});
    await mongoose.connection.close();
});

describe('Test retrieve', () => {
    test('All', async () => {
        const arr: mergedObj[] = await getService.getAll();
        expect(arr).toEqual([obj1, obj2]);
    });

    test('By identifier', async () => {
        const pulledObj1: mergedObj = await getService.getByIdentifier('21217486');
        const pulledObj2: mergedObj = await getService.getByIdentifier('8759876');
        expect(pulledObj1).toEqual(obj1);
        expect(pulledObj2).toEqual(obj2);
    });

    test('By source', async () => {
        const fromAka: mergedObj[] = await getService.getBySource('aka');
        const fromEs: mergedObj[] = await getService.getBySource('es_name');
        const fromSf: mergedObj[] = await getService.getBySource('sf_name');
        expect(fromAka).toEqual([obj1, obj2]);
        expect(fromEs).toEqual([obj1]);
        expect(fromSf).toEqual([]);
    });

    test('By date -> updated after', async () => {
        const arr: mergedObj[] = await getService.getUpdatedAfter((new Date().getTime() - 7500).toString());
        expect(arr).toEqual([obj2]);
    });
});
