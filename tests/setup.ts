// Jest 전역 설정 파일
import 'jest-extended';

// 전역 테스트 설정
beforeAll(() => {
  // 테스트 시작 전 설정
  console.log('🧪 Starting test suite...');
});

afterAll(() => {
  // 테스트 종료 후 정리
  console.log('✅ Test suite completed.');
});

// 각 테스트 전 설정
beforeEach(() => {
  // 모든 모킹 초기화
  jest.clearAllMocks();
});

// 각 테스트 후 정리
afterEach(() => {
  // 타이머 정리
  jest.clearAllTimers();
});

// 글로벌 테스트 유틸리티
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidYaml(): R;
      toHaveFigmaId(): R;
    }
  }
}

// 커스텀 매처 추가
expect.extend({
  toBeValidYaml(received: string) {
    const yaml = require('js-yaml');
    try {
      yaml.load(received);
      return {
        message: () => `Expected ${received} not to be valid YAML`,
        pass: true,
      };
    } catch (error) {
      return {
        message: () => `Expected ${received} to be valid YAML, but got error: ${error.message}`,
        pass: false,
      };
    }
  },
  
  toHaveFigmaId(received: any) {
    const figmaIdPattern = /^\d+:\d+$/;
    const hasValidId = received && 
                      typeof received.id === 'string' && 
                      figmaIdPattern.test(received.id);
    
    return {
      message: () => hasValidId 
        ? `Expected ${received.id} not to be a valid Figma ID`
        : `Expected ${received?.id || 'undefined'} to be a valid Figma ID (format: number:number)`,
      pass: hasValidId,
    };
  }
});

// 환경변수 모킹 헬퍼
export const mockEnv = (envVars: Record<string, string>) => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    process.env = { ...originalEnv, ...envVars };
  });
  
  afterEach(() => {
    process.env = originalEnv;
  });
};

// 타임아웃 설정
jest.setTimeout(30000);
