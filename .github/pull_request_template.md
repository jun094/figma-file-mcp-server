## 📋 변경 사항 요약

<!-- 이 PR에서 무엇을 변경했는지 간략하게 설명해주세요 -->

## 🔍 변경 유형

<!-- 해당하는 항목에 [x]로 체크해주세요 -->

- [ ] 🐛 **Bug fix** (기존 기능을 깨뜨리지 않는 버그 수정)
- [ ] ✨ **New feature** (기존 기능을 깨뜨리지 않는 새로운 기능 추가)
- [ ] 💥 **Breaking change** (기존 API나 동작을 변경하는 수정)
- [ ] 📚 **Documentation** (문서 개선)
- [ ] 🎨 **Style** (코드 의미에 영향을 주지 않는 변경사항 - 포맷팅, 세미콜론 등)
- [ ] ♻️ **Refactor** (버그 수정도 기능 추가도 아닌 코드 변경)
- [ ] ⚡ **Performance** (성능 개선)
- [ ] ✅ **Test** (테스트 추가 또는 기존 테스트 수정)
- [ ] 🔧 **Chore** (빌드 프로세스, 도구, 라이브러리 업데이트)
- [ ] ⏪ **Revert** (이전 커밋으로 되돌리기)

## 🎯 관련 이슈

<!-- 관련된 이슈가 있다면 링크해주세요 -->
<!-- 예: Closes #123, Fixes #456, Related to #789 -->

## 🔧 변경 내용

<!-- 변경된 내용을 자세히 설명해주세요 -->

### 📁 영향받는 컴포넌트/모듈

- [ ] `apps/figma-connector` (Figma 데이터 수집기)
- [ ] `packages/shared-types` (공유 타입 정의)
- [ ] `output/` (생성된 YAML 파일)
- [ ] 빌드 설정 (tsconfig, tsup 등)
- [ ] CI/CD 워크플로우
- [ ] 문서 (README, CONTEXT 등)

### 📝 주요 변경사항

<!-- 각 변경사항을 상세히 설명해주세요 -->

1. **변경 1**: 
   - 설명: 
   - 이유: 

2. **변경 2**: 
   - 설명: 
   - 이유: 

## 🧪 테스트

<!-- 변경사항을 어떻게 테스트했는지 설명해주세요 -->

### 테스트 환경
- [ ] 로컬 개발 환경
- [ ] CI 파이프라인
- [ ] 실제 Figma 파일로 테스트

### 수행한 테스트
- [ ] 기존 기능이 정상 동작하는지 확인
- [ ] 새로운 기능이 의도대로 동작하는지 확인
- [ ] 에러 케이스 처리 확인
- [ ] 타입 체크 통과 확인
- [ ] 빌드 성공 확인

### 테스트 명령어
```bash
# 사용한 테스트 명령어를 적어주세요
pnpm typecheck
pnpm lint
pnpm build
```

## 📷 스크린샷 (선택사항)

<!-- UI 변경이나 결과물이 있다면 스크린샷을 첨부해주세요 -->

## 🏗️ Breaking Changes

<!-- Breaking change가 있다면 자세히 설명해주세요 -->

- [ ] 이 변경사항에는 Breaking Change가 없습니다
- [ ] 이 변경사항에는 Breaking Change가 있습니다:

**Breaking Change 내용:**
<!-- Breaking change의 내용과 마이그레이션 가이드를 작성해주세요 -->

## 📚 문서 업데이트

- [ ] README.md 업데이트 필요
- [ ] CONTEXT.md 업데이트 필요
- [ ] 새로운 환경변수 추가 (.env.example 업데이트)
- [ ] API 문서 업데이트 필요
- [ ] 기타 문서 업데이트: 

## ✅ 체크리스트

<!-- PR 제출 전 모든 항목을 확인해주세요 -->

### 코드 품질
- [ ] 코드가 프로젝트의 스타일 가이드를 따릅니다
- [ ] 타입스크립트 에러가 없습니다 (`pnpm typecheck`)
- [ ] ESLint 경고/에러가 없습니다 (`pnpm lint`)
- [ ] 빌드가 성공합니다 (`pnpm build`)
- [ ] 자체 리뷰를 완료했습니다

### 테스트 및 검증
- [ ] 기존 기능이 정상 동작함을 확인했습니다
- [ ] 새로운 기능이 의도대로 동작함을 확인했습니다
- [ ] 에러 처리가 적절히 되어 있습니다
- [ ] 로그 메시지가 적절합니다

### 문서 및 커뮤니케이션
- [ ] 변경사항에 대한 적절한 주석을 추가했습니다
- [ ] 복잡한 로직에 대한 설명을 추가했습니다
- [ ] 필요한 문서를 업데이트했습니다

### 보안 및 성능
- [ ] 보안 취약점을 도입하지 않았습니다
- [ ] 성능에 부정적인 영향을 주지 않습니다
- [ ] 민감한 정보가 하드코딩되지 않았습니다

## 🔮 향후 계획

<!-- 이 PR과 관련된 향후 작업이 있다면 적어주세요 -->

## 💬 리뷰어에게

<!-- 리뷰어가 특별히 주의 깊게 봐주었으면 하는 부분이 있다면 적어주세요 -->

---

**리뷰어를 위한 참고사항:**
- 이 PR은 [feature/branch-name] 브랜치에서 작업되었습니다
- 특별히 확인해주세요: 
- 질문이나 제안사항이 있으시면 언제든 코멘트 남겨주세요! 🙏
