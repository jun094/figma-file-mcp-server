// 테스트용 환경변수 설정
process.env.NODE_ENV = 'test';
process.env.CI = 'true';

// 테스트용 Figma API 설정
process.env.FIGMA_API_TOKEN = 'test-token-123456789';
process.env.FIGMA_FILE_ID = 'test-file-id-123';

// 출력 디렉토리 설정
process.env.OUTPUT_YAML_DIR = 'tests/fixtures/output';

// 로그 레벨 설정
process.env.LOG_LEVEL = 'error'; // 테스트 중 로그 최소화

// 타임아웃 설정
process.env.API_TIMEOUT = '5000';

// 테스트 데이터베이스 설정 (필요시)
process.env.DATABASE_URL = 'sqlite::memory:';

// 기타 테스트 관련 설정
process.env.DISABLE_ANALYTICS = 'true';
process.env.DISABLE_TELEMETRY = 'true';
