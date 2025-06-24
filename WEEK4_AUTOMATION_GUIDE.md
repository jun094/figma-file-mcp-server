# 📚 4주차 실습: 자동화 시스템 구축 가이드

## 🎯 실습 목표

- GitHub Actions로 CI/CD 파이프라인 구축
- Dependabot으로 의존성 자동 관리
- Changesets로 자동 릴리즈 시스템 구축
- 이슈/PR 템플릿으로 협업 환경 개선

## 📋 준비사항

### 필요한 권한
- GitHub 저장소에 대한 **Admin** 또는 **Write** 권한
- GitHub Actions 활성화 권한
- GitHub Pages 및 Releases 생성 권한

### 환경 설정
- Node.js 18+ 설치
- pnpm 8+ 설치
- Git 설정 완료

## 🚀 단계별 설정

### 1️⃣ 생성된 파일 확인

프로젝트에 다음 파일들이 생성되었는지 확인하세요:

```
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # CI 워크플로우
│   │   └── release.yml            # Release 워크플로우  
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml         # 버그 리포트 템플릿
│   │   └── feature_request.yml    # 기능 요청 템플릿
│   ├── dependabot.yml             # Dependabot 설정
│   └── pull_request_template.md   # PR 템플릿
├── .changeset/
│   ├── config.json                # Changeset 설정
│   └── README.md                  # Changeset 가이드
├── .husky/
│   └── pre-commit                 # Pre-commit hook
├── .eslintrc.json                 # ESLint 설정
├── .prettierrc.json               # Prettier 설정
└── package.json                   # 업데이트된 package.json
```

### 2️⃣ 의존성 설치

```bash
# 새로운 의존성 설치
pnpm install

# Git hooks 설정
npx husky install
```

### 3️⃣ GitHub 저장소 설정

```bash
# 1. 변경사항 커밋
git add .
git commit -m "feat: add CI/CD pipeline and automation setup"
git push origin main

# 2. develop 브랜치 생성 (선택)
git checkout -b develop
git push -u origin develop
```

### 4️⃣ GitHub Secrets 설정

GitHub 저장소의 **Settings > Secrets and variables > Actions**에서 다음 시크릿을 추가하세요:

**필수 시크릿:**
- `GITHUB_TOKEN`: 자동으로 제공됨 (추가 설정 불필요)

**선택적 시크릿 (실제 Figma 데이터 사용 시):**
- `FIGMA_API_TOKEN`: Figma Personal Access Token
- `FIGMA_FILE_ID`: 대상 Figma 파일 ID

**NPM 배포용 (필요시):**
- `NPM_TOKEN`: NPM 퍼블리시용 토큰

### 5️⃣ GitHub Actions 활성화

1. **Settings > Actions > General**에서 Actions 권한 설정:
   - "Allow all actions and reusable workflows" 선택

2. **Settings > Actions > General > Workflow permissions**:
   - "Read and write permissions" 선택
   - "Allow GitHub Actions to create and approve pull requests" 체크

### 6️⃣ Dependabot 활성화

1. **Settings > Security & analysis**에서:
   - "Dependabot alerts" 활성화
   - "Dependabot security updates" 활성화
   - "Dependabot version updates" 활성화

## 🧪 테스트 및 검증

### 1. CI 파이프라인 테스트

```bash
# 새로운 브랜치 생성
git checkout -b test/ci-setup

# 코드 품질 확인
pnpm lint
pnpm typecheck
pnpm build

# 변경사항 커밋
git add .
git commit -m "test: verify CI pipeline setup"
git push -u origin test/ci-setup
```

### 2. Pull Request 생성

- GitHub에서 `test/ci-setup` → `main` PR 생성
- PR 템플릿이 자동으로 적용되는지 확인
- CI 워크플로우가 실행되는지 확인

### 3. 이슈 템플릿 테스트

- **Issues** 탭에서 "New issue" 클릭
- 버그 리포트와 기능 요청 템플릿이 보이는지 확인

### 4. Changeset 사용법

```bash
# 변경사항이 있을 때 changeset 생성
pnpm changeset

# 생성된 changeset 확인
ls .changeset

# 버전 업데이트 (로컬 테스트)
pnpm changeset:version

# 상태 확인
pnpm version:check
```

### 5. Dependabot 확인

- 며칠 후 Dependabot이 자동으로 의존성 업데이트 PR을 생성하는지 확인

## 🎯 실습 과제

### 기본 과제 (필수)

1. **CI 파이프라인 구축 완료**
   - [ ] GitHub Actions 워크플로우 설정
   - [ ] 테스트, 린트, 빌드 자동화
   - [ ] PR에서 CI 통과 확인

2. **Dependabot 설정 완료**
   - [ ] `.github/dependabot.yml` 설정
   - [ ] 의존성 업데이트 PR 자동 생성 확인

3. **이슈/PR 템플릿 적용**
   - [ ] 버그 리포트 템플릿 작성
   - [ ] 기능 요청 템플릿 작성
   - [ ] PR 템플릿 작성

### 선택 과제 (심화)

4. **Changeset 설정 및 사용**
   - [ ] `.changeset/config.json` 설정
   - [ ] 실제 changeset 생성 및 테스트
   - [ ] 자동 릴리즈 워크플로우 테스트

5. **코드 품질 도구 통합**
   - [ ] ESLint 규칙 커스터마이징
   - [ ] Prettier 설정 최적화
   - [ ] Pre-commit hooks 활용

## 📝 Changeset 사용 가이드

### 새로운 기능 추가 시

```bash
# 1. 기능 개발 완료 후
pnpm changeset

# 2. 변경 유형 선택
# - patch: 버그 수정
# - minor: 새로운 기능 추가  
# - major: Breaking changes

# 3. 변경사항 설명 작성
# 예: "Add new Figma component extraction feature"

# 4. 생성된 파일 확인
ls .changeset
```

### 릴리즈 생성

```bash
# 1. main 브랜치에 변경사항 push
git push origin main

# 2. GitHub Actions가 자동으로:
# - Release PR 생성 또는
# - 실제 릴리즈 배포 (changeset이 있는 경우)
```

## 🔍 트러블슈팅

### 자주 발생하는 문제들

1. **GitHub Actions 권한 오류**
   ```
   Error: Resource not accessible by integration
   ```
   **해결**: Settings > Actions > Workflow permissions에서 "Read and write permissions" 설정

2. **Changeset 명령어 인식 안됨**
   ```
   command not found: changeset
   ```
   **해결**: `pnpm install` 후 `pnpm changeset` 사용

3. **ESLint 에러**
   ```
   Parsing error: Cannot read file
   ```
   **해결**: tsconfig.json 경로 확인 및 수정

4. **Dependabot PR 생성 안됨**
   **해결**: `.github/dependabot.yml` 파일 위치와 문법 확인

### 도움이 되는 명령어

```bash
# 현재 설정 상태 확인
pnpm audit
pnpm version:check
git status

# 코드 품질 일괄 수정
pnpm lint:fix
pnpm format

# Changeset 상태 확인
pnpm changeset status --verbose
```

## 📚 추가 학습 자료

- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Dependabot 설정 가이드](https://docs.github.com/en/code-security/dependabot)
- [Changesets 공식 문서](https://github.com/changesets/changesets)
- [ESLint 설정 가이드](https://eslint.org/docs/user-guide/configuring)

## 🎉 완료 확인

모든 설정이 완료되면:

1. ✅ CI 워크플로우가 PR에서 자동 실행됨
2. ✅ Dependabot이 주간 의존성 업데이트 PR 생성
3. ✅ 이슈 생성 시 템플릿 자동 적용
4. ✅ PR 생성 시 템플릿 자동 적용
5. ✅ Changeset으로 버전 관리 및 자동 릴리즈
6. ✅ Pre-commit hooks로 코드 품질 자동 검증

---

**다음 주차 예고**: 5주차에서는 고급 CI/CD 전략, 테스트 커버리지 리포팅, 그리고 커뮤니티 관리 자동화에 대해 학습합니다! 🚀

## 💡 팁

- **Changeset 메시지**: 사용자 관점에서 명확하게 작성
- **의존성 업데이트**: 정기적으로 리뷰하고 머지
- **CI 실패**: 로그를 꼼꼼히 확인하여 문제 해결
- **템플릿 활용**: 팀 내에서 일관된 이슈/PR 작성 문화 정착
