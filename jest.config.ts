export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				diagnostics: {
					ignoreCodes: [1343],
				},
				astTransformers: {
					before: [
						{
							path: 'node_modules/ts-jest-mock-import-meta',
							options: { metaObjectReplacement: { url: 'https://www.url.com' } },
						},
					],
				},
			},
		],
	},
	modulePathIgnorePatterns: ['src/__tests__/styleMock.ts'],
	moduleNameMapper: {
		'\\.(css|less|svg)$': '<rootDir>/src/__tests__/styleMock.ts',
	},
};
