module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 20000,
    globals: {},
    transform: {
        '\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: './tsconfig.json',
        }],
    },
};