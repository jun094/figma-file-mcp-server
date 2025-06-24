/** @type {import('jest').Config} */
module.exports = {
  // 기본 설정
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // 테스트 파일 패턴
  testMatch: [
    '<rootDir>/apps/**/*.test.ts',
    '<rootDir>/packages/**/*.test.ts',
    '<rootDir>/tests/**/*.test.ts'
  ],
  
  // 변환 설정
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  
  // 모듈 해결
  moduleNameMapping: {
    '^@figma-design-system-query/types$': '<rootDir>/packages/shared-types/src',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // 커버리지 설정
  collectCoverage: true,
  collectCoverageFrom: [
    'apps/**/*.ts',
    'packages/**/*.ts',
    '!**/*.d.ts',
    '!**/*.test.ts',
    '!**/*.spec.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**'
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary'
  ],
  
  // 커버리지 임계값
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 설정 파일들
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // 테스트 시간 제한
  testTimeout: 30000,
  
  // 병렬 실행
  maxWorkers: '50%',
  
  // 캐시 설정
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // 상세한 출력
  verbose: true,
  
  // 실패한 테스트만 다시 실행
  bail: false,
  
  // 에러 출력 설정
  errorOnDeprecated: true,
  
  // 글로벌 설정
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  
  // 무시할 패턴
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/output/'
  ],
  
  // 모듈 경로 무시
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/coverage/'
  ],
  
  // 리포터 설정
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
        suiteName: 'Figma DS AI Tests'
      }
    ],
    [
      'jest-html-reporters',
      {
        publicPath: 'coverage',
        filename: 'test-report.html',
        expand: true
      }
    ]
  ],
  
  // Mock 설정
  clearMocks: true,
  restoreMocks: true,
  
  // 환경변수 모킹
  setupFiles: ['<rootDir>/tests/env.setup.ts']
};
