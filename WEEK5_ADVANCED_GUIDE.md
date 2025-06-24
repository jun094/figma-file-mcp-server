# 📚 5주차 실습: 지속 가능한 프로젝트 운영과 커뮤니티 관리 (고급)

## 🎯 실습 목표

- 고급 CI/CD 전략 및 테스트 커버리지 리포팅 구현
- 릴리즈 자동화 심화 (Changeset 기반)
- 오픈소스 보안 강화 (다중 보안 스캔)
- 커뮤니티 활성화 및 관리 자동화
- 프로젝트 상태 배지 및 문서화 고도화

## 📋 준비사항

### 4주차 완료 확인
- [ ] GitHub Actions CI 파이프라인 구축 완료
- [ ] Dependabot 설정 완료
- [ ] Changeset 릴리즈 시스템 구축 완료
- [ ] 이슈/PR 템플릿 적용 완료

### 추가 서비스 계정 (선택)
- **Codecov**: 테스트 커버리지 리포팅
- **Coveralls**: 대안 커버리지 서비스
- **Snyk**: 보안 취약점 스캔
- **LGTM**: 코드 품질 분석

## 🚀 단계별 설정

### 1️⃣ 생성된 파일 확인

프로젝트에 다음 고급 파일들이 생성되었는지 확인하세요:

```
.
├── .github/
│   ├── workflows/
│   │   ├── advanced-ci.yml         # 고급 CI/CD 파이프라인
│   │   ├── security.yml            # 다중 보안 스캔
│   │   └── community.yml           # 커뮤니티 관리 자동화
│   └── codeql-config.yml           # CodeQL 설정
├── tests/
│   ├── setup.ts                    # Jest 전역 설정
│   ├── env.setup.ts                # 테스트 환경 설정
│   └── helpers/
│       └── mock-helpers.ts         # 테스트 헬퍼 함수
├── apps/figma-connector/src/
│   └── index.test.ts               # 실제 테스트 파일
├── jest.config.js                  # Jest 설정
├── CONTRIBUTING.md                 # 기여 가이드라인
├── CODE_OF_CONDUCT.md              # 행동 강령
├── SECURITY.md                     # 보안 정책
└── README.md                       # 상태 배지 포함 업데이트
```

### 2️⃣ 의존성 설치

```bash
# 새로운 테스트 및 보안 의존성 설치
pnpm install

# 전역 도구 설치 (선택)
npm install -g snyk license-checker
```

### 3️⃣ 서비스 계정 설정

#### Codecov 설정
1. [Codecov](https://codecov.io/) 계정 생성
2. GitHub 저장소 연동
3. `CODECOV_TOKEN` 시크릿 추가

#### Snyk 설정 (선택)
1. [Snyk](https://snyk.io/) 계정 생성
2. API 토큰 발급
3. `SNYK_TOKEN` 시크릿 추가

### 4️⃣ GitHub 설정 업데이트

#### Advanced Secrets 추가
Settings > Secrets and variables > Actions에서:

- `CODECOV_TOKEN`: Codecov 업로드용
- `SNYK_TOKEN`: Snyk 보안 스캔용 (선택)
- `NPM_TOKEN`: NPM 배포용 (필요시)

#### Branch Protection Rules 설정
Settings > Branches에서 `main` 브랜치에:

- [ ] Require status checks to pass before merging
  - [ ] `test (18.x)`
  - [ ] `test (20.x)`
  - [ ] `security-audit`
  - [ ] `codeql`
- [ ] Require branches to be up to date before merging
- [ ] Require linear history
- [ ] Include administrators

#### GitHub Features 활성화
Settings에서:

- [ ] **Issues** 활성화
- [ ] **Discussions** 활성화 (커뮤니티 관리용)
- [ ] **Sponsorships** 활성화 (선택)
- [ ] **Security** > **Code scanning alerts** 활성화

### 5️⃣ 테스트 시스템 구축

#### 1. 기본 테스트 실행

```bash
# 테스트 실행
pnpm test

# 커버리지 포함 테스트
pnpm test:coverage

# 성능 테스트
pnpm test:performance
```

#### 2. 실제 테스트 케이스 추가

현재 생성된 테스트 파일은 템플릿입니다. 실제 구현에 맞게 수정하세요:

```typescript
// apps/figma-connector/src/index.test.ts 예시
import { fetchFigmaFileAndVariables, transformFigmaData } from './index';

describe('Figma Connector', () => {
  it('should extract components correctly', async () => {
    // 실제 구현 테스트
    const result = await fetchFigmaFileAndVariables('test-file', 'test-token');
    expect(result).toBeDefined();
  });
});
```

#### 3. 커버리지 목표 설정

`jest.config.js`에서 커버리지 임계값 조정:

```javascript
coverageThreshold: {
  global: {
    branches: 70,    // 브랜치 커버리지 70%
    functions: 80,   // 함수 커버리지 80%
    lines: 80,       // 라인 커버리지 80%
    statements: 80   // 구문 커버리지 80%
  }
}
```

### 6️⃣ 보안 강화

#### 1. 자동 보안 스캔 설정

```bash
# Snyk 설치 및 인증 (선택)
npm install -g snyk
snyk auth

# 보안 스캔 실행
pnpm security:scan
```

#### 2. 의존성 라이선스 체크

```bash
# 허용된 라이선스만 사용하는지 확인
pnpm licenses:check
```

#### 3. .gitignore 보안 강화

```bash
# .gitignore에 추가
echo "# Security" >> .gitignore
echo "*.pem" >> .gitignore
echo "*.key" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### 7️⃣ 릴리즈 자동화 심화

#### 1. Changeset 활용법

```bash
# 새로운 기능 추가 후
pnpm changeset

# 변경 유형 선택
# - patch: 버그 수정, 문서 업데이트
# - minor: 새로운 기능 추가
# - major: Breaking changes

# 변경 설명 작성
# 예: "Add advanced security scanning with Snyk integration"
```

#### 2. 릴리즈 노트 자동 생성 테스트

```bash
# 더미 changeset 생성하여 테스트
mkdir .changeset
cat > .changeset/test-release.md << EOF
---
"@figma-ds-ai/harvester": patch
---

Add comprehensive testing and security improvements
EOF

# 버전 업데이트 시뮬레이션
pnpm changeset:version

# 생성된 CHANGELOG.md 확인
cat CHANGELOG.md
```

#### 3. GitHub Releases 연동 확인

- Changeset이 자동으로 GitHub Release 생성하는지 확인
- 릴리즈 노트에 changeset 설명이 포함되는지 확인

### 8️⃣ 커뮤니티 관리 자동화

#### 1. Discussions 설정

GitHub 저장소에서:
1. **Settings** > **Features** > **Discussions** 활성화
2. 카테고리 설정:
   - 💡 **Ideas**: 기능 제안
   - 🙋 **Q&A**: 질문 및 답변
   - 📢 **Announcements**: 공지사항
   - 🗣️ **General**: 일반 토론

#### 2. 이슈 라벨 시스템 구축

GitHub 저장소에서 라벨 추가:

```bash
# 우선순위 라벨
priority/low, priority/medium, priority/high, priority/critical

# 타입 라벨  
type/bug, type/feature, type/docs, type/security

# 영역 라벨
area/figma-api, area/yaml, area/testing, area/ci-cd

# 상태 라벨
status/needs-triage, status/in-progress, status/blocked

# 기여 라벨
good-first-issue, help-wanted, beginner-friendly
```

#### 3. 커뮤니티 지표 모니터링

- GitHub Insights에서 커뮤니티 건강도 확인
- 월간 기여자 수, 이슈 해결율 등 추적

### 9️⃣ 상태 배지 및 문서화

#### 1. README 배지 추가 확인

생성된 README.md에 다음 배지들이 포함되어 있는지 확인:

- ✅ CI 상태
- ✅ 테스트 커버리지 (Codecov, Coveralls)
- ✅ npm 버전
- ✅ 라이선스
- ✅ Node.js 버전
- ✅ 보안 스캔 결과
- ✅ GitHub 스타/포크 수

#### 2. 문서 구조 완성

```bash
# docs 디렉토리 생성
mkdir -p docs/images

# API 문서 생성 (예시)
cat > docs/api.md << 'EOF'
# API Reference

## Endpoints

### GET /api/components
Returns all design system components.

### POST /api/ask
Process natural language questions about the design system.
EOF
```

#### 3. 기여자 인정 시스템

All Contributors 봇 설정:
1. [All Contributors 앱](https://github.com/apps/allcontributors) 설치
2. 첫 번째 기여자 추가: `@all-contributors please add @jun094 for code`

## 🧪 테스트 및 검증

### 1. CI/CD 파이프라인 테스트

```bash
# 새로운 기능 브랜치 생성
git checkout -b test/advanced-ci

# 의도적으로 작은 변경 추가
echo "// Test comment" >> apps/figma-connector/src/index.ts

# 커밋 및 푸시
git add .
git commit -m "test: verify advanced CI pipeline"
git push -u origin test/advanced-ci
```

### 2. PR 생성으로 전체 파이프라인 확인

- GitHub에서 PR 생성
- 다음 체크들이 모두 통과하는지 확인:
  - [ ] CI (기본)
  - [ ] Advanced CI (Node.js 매트릭스)
  - [ ] Security Scan
  - [ ] CodeQL Analysis
  - [ ] Dependency Review
  - [ ] 커버리지 리포트 댓글

### 3. 커뮤니티 기능 테스트

#### 이슈 생성 테스트
1. 새 이슈 생성
2. 버그 리포트 템플릿 사용
3. 자동 라벨링 확인
4. 웰컴 메시지 확인

#### PR 테스트
1. PR 생성
2. PR 템플릿 자동 적용 확인
3. 첫 기여자 웰컴 메시지 확인
4. 자동 체크리스트 확인

### 4. 보안 스캔 결과 확인

- **Security** 탭에서 스캔 결과 확인
- CodeQL 알림 여부 확인
- Dependabot 알림 확인

### 5. 릴리즈 프로세스 테스트

```bash
# 실제 changeset 생성
pnpm changeset

# 내용 예시:
# - patch for bug fixes
# - "Fix security vulnerability in dependency parsing"

# main 브랜치에 머지 후 자동 릴리즈 확인
```

## 🎯 고급 과제

### 기본 과제 (필수)

1. **고급 CI/CD 파이프라인 구축**
   - [ ] 다중 Node.js 버전 매트릭스 빌드
   - [ ] 테스트 커버리지 80% 달성
   - [ ] 성능 테스트 통합

2. **보안 강화**
   - [ ] 다중 보안 스캔 도구 통합
   - [ ] 자동 취약점 알림 설정
   - [ ] 라이선스 컴플라이언스 확인

3. **커뮤니티 관리 자동화**
   - [ ] Stale bot 설정으로 오래된 이슈 관리
   - [ ] 웰컴 봇으로 신규 기여자 환영
   - [ ] 자동 라벨링 시스템 구축

### 심화 과제 (선택)

4. **고급 릴리즈 자동화**
   - [ ] 프리릴리즈 브랜치 설정
   - [ ] 릴리즈 노트 자동 생성 고도화
   - [ ] GitHub Releases 자동 배포

5. **문서화 및 커뮤니티 성장**
   - [ ] 상태 배지 최적화
   - [ ] 기여자 인정 시스템 구축
   - [ ] 커뮤니티 건강도 모니터링

6. **성능 및 모니터링**
   - [ ] 번들 크기 추적
   - [ ] 성능 메트릭 수집
   - [ ] 자동 성능 회귀 감지

## 🔍 트러블슈팅

### 자주 발생하는 문제들

#### 1. 테스트 커버리지 업로드 실패
```
Error: Codecov token not found
```
**해결**: `CODECOV_TOKEN` 시크릿 올바른 설정 확인

#### 2. CodeQL 분석 실패
```
Error: Could not auto-detect the language
```
**해결**: `.github/codeql-config.yml` 설정 확인

#### 3. 보안 스캔 실패
```
Error: Snyk token invalid
```
**해결**: `SNYK_TOKEN` 갱신 또는 스캔 단계 선택 해제

#### 4. 릴리즈 자동화 오류
```
Error: No changesets found
```
**해결**: `pnpm changeset` 명령으로 changeset 생성 후 재시도

### 성능 최적화 팁

```bash
# CI 실행 시간 단축
# 1. 의존성 캐시 최적화
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.pnpm-store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}

# 2. 병렬 테스트 실행  
pnpm test --maxWorkers=50%

# 3. 선택적 워크플로우 실행
if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

## 📊 성공 지표

### 완료 확인 체크리스트

#### CI/CD 파이프라인
- [ ] ✅ 다중 Node.js 버전에서 빌드 성공
- [ ] ✅ 테스트 커버리지 80% 이상 달성
- [ ] ✅ 보안 스캔 모두 통과
- [ ] ✅ 성능 테스트 임계값 통과

#### 커뮤니티 관리
- [ ] ✅ 신규 이슈에 자동 웰컴 메시지
- [ ] ✅ 스테일 이슈/PR 자동 관리
- [ ] ✅ 자동 라벨링 기능 동작
- [ ] ✅ PR 템플릿 자동 적용

#### 문서화 및 배지
- [ ] ✅ README에 모든 상태 배지 표시
- [ ] ✅ 기여 가이드라인 작성 완료
- [ ] ✅ 보안 정책 문서화 완료
- [ ] ✅ 행동 강령 설정 완료

#### 릴리즈 자동화
- [ ] ✅ Changeset 기반 버전 관리
- [ ] ✅ 자동 CHANGELOG 생성
- [ ] ✅ GitHub Releases 자동 생성
- [ ] ✅ 릴리즈 노트 고품질

### 성능 메트릭

| 지표 | 목표 | 달성 |
|------|------|------|
| CI 빌드 시간 | < 5분 | ⬜ |
| 테스트 커버리지 | > 80% | ⬜ |
| 보안 취약점 | 0개 | ⬜ |
| 월간 기여자 수 | > 3명 | ⬜ |

## 📚 추가 학습 자료

### 고급 GitHub Actions
- [GitHub Actions 고급 워크플로우](https://docs.github.com/en/actions/learn-github-actions/expressions)
- [매트릭스 빌드 전략](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [조건부 워크플로우](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetbranchesbranches-ignore)

### 오픈소스 보안
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Features](https://github.com/features/security)
- [Snyk 보안 가이드](https://snyk.io/learn/)

### 커뮤니티 관리
- [오픈소스 커뮤니티 가이드](https://opensource.guide/)
- [GitHub 커뮤니티 건강도](https://docs.github.com/en/communities)
- [All Contributors 명세](https://allcontributors.org/)

## 🎉 다음 단계

5주차 실습을 완료하신 것을 축하드립니다! 🎊

### 향후 발전 방향

1. **실제 기능 구현**
   - Q&A 엔진 개발
   - REST API 서버 구축
   - 웹 인터페이스 개발

2. **커뮤니티 성장**
   - 오픈소스 프로젝트로 공개
   - 컨퍼런스 발표
   - 튜토리얼 콘텐츠 제작

3. **엔터프라이즈 적용**
   - 사내 디자인 시스템에 적용
   - 팀 워크플로우 통합
   - 성과 측정 및 개선

---

**🚀 완벽한 오픈소스 프로젝트 운영 환경을 구축하셨습니다!**

이제 실제 비즈니스 로직 구현에 집중하여 프로젝트를 발전시켜 나가세요.
