import * as service from '../src/express/service';

jest.mock('../src/logger', () => {
    return {
        default: jest.fn(),
    };
});

jest.mock('../src/rabbit', () => {
    return {
        sendToSelectorQueue: jest.fn(),
    };
});
