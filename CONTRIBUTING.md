# 🤝 기여 가이드라인

Figma Design System Q&A MCP 서버 프로젝트에 기여해주셔서 감사합니다! 여러분의 참여가 프로젝트를 더욱 발전시킵니다.

## 📋 목차

- [시작하기](#시작하기)
- [개발 환경 설정](#개발-환경-설정)
- [기여 방법](#기여-방법)
- [코드 스타일](#코드-스타일)
- [테스팅](#테스팅)
- [커밋 메시지 가이드라인](#커밋-메시지-가이드라인)
- [Pull Request 가이드라인](#pull-request-가이드라인)
- [이슈 리포팅](#이슈-리포팅)
- [커뮤니티 규칙](#커뮤니티-규칙)

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 18+ 
- **pnpm** 8+
- **Git** 
- **Figma 계정** (테스트용)

### 프로젝트 구조 이해

```
figma-file-mcp-server/
├── apps/figma-connector/      # Figma API 연동 메인 애플리케이션
├── packages/shared-types/     # 공유 타입 정의
├── output/design-system/      # 생성된 YAML 파일
├── .github/                   # GitHub Actions 워크플로우
└── docs/                      # 문서
```

## 🛠️ 개발 환경 설정

### 1. 저장소 포크 및 클론

```bash
# 1. GitHub에서 저장소를 포크합니다
# 2. 포크한 저장소를 클론합니다
git clone https://github.com/YOUR_USERNAME/figma-file-mcp-server.git
cd figma-file-mcp-server

# 3. 원본 저장소를 upstream으로 추가합니다
git remote add upstream https://github.com/jun094/figma-file-mcp-server.git
```

### 2. 의존성 설치

```bash
# pnpm을 사용하여 의존성을 설치합니다
pnpm install
```

### 3. 환경변수 설정

```bash
# .env 파일을 생성합니다
cp .env.example .env

# 필요한 환경변수를 설정합니다
# FIGMA_API_TOKEN=your_figma_token
# FIGMA_FILE_ID=your_test_file_id
```

### 4. 개발 서버 실행

```bash
# 개발 모드로 실행
pnpm dev

# 빌드 테스트
pnpm build

# 타입 체크
pnpm typecheck

# 린트 체크
pnpm lint
```

## 🎯 기여 방법

### 🐛 버그 수정

1. **이슈 확인**: 기존 이슈를 확인하거나 새로 생성
2. **브랜치 생성**: `fix/issue-number-description`
3. **수정 작업**: 최소한의 변경으로 문제 해결
4. **테스트**: 수정사항이 제대로 동작하는지 확인
5. **PR 생성**: 명확한 제목과 설명으로 PR 생성

### ✨ 새로운 기능 추가

1. **기능 제안**: 먼저 이슈를 통해 기능을 제안하고 논의
2. **설계 검토**: 큰 변경사항은 메인테이너와 사전 논의
3. **브랜치 생성**: `feat/feature-name`
4. **개발**: 기능 구현 및 테스트 작성
5. **문서 업데이트**: README나 관련 문서 업데이트
6. **PR 생성**: 상세한 설명과 함께 PR 생성

### 📚 문서 개선

1. **브랜치 생성**: `docs/topic-name`
2. **문서 수정**: 명확하고 도움되는 내용으로 작성
3. **검토**: 오타나 문법 오류 확인
4. **PR 생성**: 변경사항 요약과 함께 PR 생성

## 🎨 코드 스타일

### TypeScript 가이드라인

- **타입 안전성**: `any` 사용 최소화
- **명명 규칙**: camelCase 사용
- **인터페이스**: 명확한 타입 정의
- **에러 처리**: 적절한 try-catch 사용

```typescript
// ✅ 좋은 예
interface FigmaComponentData {
  id: string;
  name: string;
  type: ComponentType;
}

async function fetchComponentData(fileId: string): Promise<FigmaComponentData[]> {
  try {
    const response = await figmaApi.getFile(fileId);
    return transformComponents(response.document);
  } catch (error) {
    logger.error('Failed to fetch component data', { fileId, error });
    throw new Error(`Component fetch failed: ${error.message}`);
  }
}

// ❌ 나쁜 예
function getData(id: any): any {
  // 타입 정의 없음, 에러 처리 없음
  return api.get(id);
}
```

### 자동 포맷팅

프로젝트는 ESLint와 Prettier를 사용합니다:

```bash
# 린트 체크 및 자동 수정
pnpm lint:fix

# 포맷팅 적용
pnpm format

# 커밋 전 자동 실행 (husky)
git commit -m "your message"  # 자동으로 lint-staged 실행
```

## 🧪 테스팅

### 테스트 작성 가이드라인

```typescript
// 단위 테스트 예시
describe('FigmaConnector', () => {
  it('should extract component data correctly', async () => {
    // Given
    const mockFileData = createMockFigmaFile();
    
    // When
    const result = await connector.extractComponents(mockFileData);
    
    // Then
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      id: 'component-1',
      name: 'Button',
      type: 'COMPONENT'
    });
  });
  
  it('should handle API errors gracefully', async () => {
    // Given
    const invalidFileId = 'invalid-id';
    
    // When & Then
    await expect(connector.fetchFile(invalidFileId))
      .rejects
      .toThrow('Invalid file ID');
  });
});
```

### 테스트 실행

```bash
# 모든 테스트 실행
pnpm test

# 커버리지 포함 테스트
pnpm test:coverage

# 특정 파일 테스트
pnpm test figma-connector.test.ts

# 변경사항 관련 테스트만 실행
pnpm test --watch
```

## 📝 커밋 메시지 가이드라인

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 타입

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅 (기능 변경 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 추가/수정
- **chore**: 빌드, 패키지 매니저 등 기타 변경

### 예시

```bash
# 기능 추가
git commit -m "feat(connector): add support for Figma variables extraction"

# 버그 수정
git commit -m "fix(yaml): resolve encoding issue with Korean characters"

# 문서 업데이트
git commit -m "docs: update installation guide with troubleshooting"

# 중요한 변경사항 (Breaking Change)
git commit -m "feat!: change API response format

BREAKING CHANGE: The response format has changed from array to object
with metadata. Update your code to use the new format."
```

## 🔄 Pull Request 가이드라인

### PR 제목

커밋 메시지와 동일한 형식을 사용합니다:
```
feat(connector): add Figma variables support
```

### PR 설명

PR 템플릿을 활용하여 다음 정보를 포함합니다:

1. **변경사항 요약**
2. **변경 유형** (체크박스)
3. **관련 이슈**
4. **테스트 결과**
5. **스크린샷** (UI 변경 시)
6. **Breaking Changes** (있는 경우)

### PR 체크리스트

- [ ] 코드가 프로젝트 스타일 가이드를 따릅니다
- [ ] 모든 테스트가 통과합니다
- [ ] 타입 체크가 통과합니다
- [ ] 린트 체크가 통과합니다
- [ ] 적절한 테스트를 추가했습니다
- [ ] 관련 문서를 업데이트했습니다
- [ ] 자체 리뷰를 완료했습니다

### 리뷰 프로세스

1. **자동 체크**: CI가 통과해야 합니다
2. **코드 리뷰**: 최소 1명의 메인테이너 승인 필요
3. **피드백 반영**: 리뷰 코멘트에 적극 응답
4. **머지**: 승인 후 메인테이너가 머지

## 🐛 이슈 리포팅

### 버그 리포트

이슈 템플릿을 사용하여 다음 정보를 포함합니다:

- **버그 설명**: 명확하고 간결한 설명
- **재현 단계**: 단계별 재현 방법
- **예상 동작**: 기대했던 결과
- **실제 동작**: 실제 발생한 결과
- **환경 정보**: OS, Node.js 버전 등
- **로그/에러**: 관련 로그나 에러 메시지

### 기능 요청

- **문제 설명**: 해결하고자 하는 문제
- **제안 해결책**: 구체적인 해결 방안
- **기능 카테고리**: 어떤 영역의 기능인지
- **우선순위**: 기능의 중요도
- **대안 검토**: 고려한 다른 방법들

## 🏷️ 라벨 시스템

### 이슈 라벨

- **우선순위**: `priority/high`, `priority/medium`, `priority/low`
- **타입**: `bug`, `enhancement`, `documentation`
- **영역**: `figma-api`, `data-processing`, `yaml`
- **상태**: `needs-triage`, `needs-attention`, `blocked`
- **기여**: `good-first-issue`, `help-wanted`

### PR 라벨

- **타입**: `bug`, `feature`, `docs`, `refactor`
- **상태**: `work-in-progress`, `needs-review`, `ready-to-merge`
- **크기**: `size/S`, `size/M`, `size/L`, `size/XL`

## 🌟 Good First Issues

처음 기여하시는 분들을 위한 이슈들:

- 문서 개선 및 오타 수정
- 단위 테스트 추가
- 에러 메시지 개선
- 코드 주석 추가
- 간단한 버그 수정

`good-first-issue` 라벨을 찾아보세요!

## 💬 커뮤니티 규칙

### 행동 강령

모든 참여자는 [Code of Conduct](./CODE_OF_CONDUCT.md)를 준수해야 합니다:

- **존중**: 다른 사람의 의견과 경험을 존중
- **포용**: 모든 배경의 사람들을 환영
- **건설적**: 건설적인 피드백과 비판
- **전문적**: 전문적이고 친근한 태도 유지

### 소통 채널

- **이슈**: 버그 리포트, 기능 요청
- **PR**: 코드 변경사항 논의
- **Discussions**: 일반적인 질문, 아이디어 공유
- **이메일**: 민감한 보안 문제

### 응답 시간

- **이슈**: 2-3일 내 초기 응답
- **PR**: 3-5일 내 리뷰 시작
- **보안 이슈**: 24시간 내 응답

## 🎉 기여자 인정

모든 기여자는 다음과 같이 인정받습니다:

- **README**: 기여자 목록에 추가
- **릴리즈 노트**: 주요 기여사항 언급
- **이슈/PR**: 공개적인 감사 표현

### 기여 유형

- 코드 기여
- 문서 개선
- 버그 리포트
- 기능 제안
- 커뮤니티 지원
- 테스트 및 QA

## 📞 도움이 필요하신가요?

- 📧 **이메일**: jun094@example.com
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jun094/figma-file-mcp-server/discussions)
- 🐛 **이슈**: [새 이슈 생성](https://github.com/jun094/figma-file-mcp-server/issues/new)

---

**감사합니다!** 여러분의 기여가 오픈소스 커뮤니티를 더욱 발전시킵니다. 🚀
