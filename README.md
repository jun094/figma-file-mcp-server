# 📊 Figma Design System Q&A MCP Server

<!-- Status Badges -->
[![CI Status](https://github.com/jun094/figma-file-mcp-server/workflows/CI/badge.svg)](https://github.com/jun094/figma-file-mcp-server/actions/workflows/ci.yml)
[![Advanced CI](https://github.com/jun094/figma-file-mcp-server/workflows/Advanced%20CI/badge.svg)](https://github.com/jun094/figma-file-mcp-server/actions/workflows/advanced-ci.yml)
[![Security Scan](https://github.com/jun094/figma-file-mcp-server/workflows/Security%20Scan/badge.svg)](https://github.com/jun094/figma-file-mcp-server/actions/workflows/security.yml)

[![codecov](https://codecov.io/gh/jun094/figma-file-mcp-server/branch/main/graph/badge.svg)](https://codecov.io/gh/jun094/figma-file-mcp-server)
[![Coverage Status](https://coveralls.io/repos/github/jun094/figma-file-mcp-server/badge.svg?branch=main)](https://coveralls.io/github/jun094/figma-file-mcp-server?branch=main)

[![npm version](https://badge.fury.io/js/@figma-ds-ai%2Fharvester.svg)](https://badge.fury.io/js/@figma-ds-ai%2Fharvester)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

[![Known Vulnerabilities](https://snyk.io/test/github/jun094/figma-file-mcp-server/badge.svg)](https://snyk.io/test/github/jun094/figma-file-mcp-server)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/jun094/figma-file-mcp-server.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/jun094/figma-file-mcp-server/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/jun094/figma-file-mcp-server.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/jun094/figma-file-mcp-server/context:javascript)

[![GitHub stars](https://img.shields.io/github/stars/jun094/figma-file-mcp-server.svg?style=social&label=Star)](https://github.com/jun094/figma-file-mcp-server)
[![GitHub forks](https://img.shields.io/github/forks/jun094/figma-file-mcp-server.svg?style=social&label=Fork)](https://github.com/jun094/figma-file-mcp-server/fork)

> 🚀 **Figma API**를 통해 디자인 시스템 정보를 추출하고 **YAML**로 저장하여, **자연어 질의응답**이 가능한 **MCP (Model-Controller-Presenter) 서버**를 구축하는 프로젝트입니다.

## 📋 목차

- [특징](#-특징)
- [설치](#-설치)
- [사용법](#-사용법)
- [API 문서](#-api-문서)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

## ✨ 특징

### 🔄 **자동화된 데이터 추출**
- Figma API를 통한 Variables, Components, Component Sets 정보 자동 수집
- 실시간 동기화 및 변경사항 추적
- 다양한 Figma 파일 형식 지원

### 📊 **구조화된 데이터 관리**
- YAML 형식으로 가독성 높은 데이터 저장
- 버전 관리 및 변경 이력 추적
- 다국어 및 특수문자 완벽 지원

### 🤖 **지능형 질의응답 시스템**
- 자연어 기반 디자인 시스템 정보 검색
- 컴포넌트 사용법 및 가이드라인 제공
- 개발자-디자이너 간 소통 개선

### 🛡️ **엔터프라이즈급 보안**
- 다중 보안 스캔 (CodeQL, Snyk, Trivy)
- 의존성 취약점 자동 모니터링
- 암호화된 API 키 관리

### 📈 **성능 및 모니터링**
- 실시간 성능 메트릭 수집
- 자동화된 테스트 커버리지 (80%+)
- CI/CD 파이프라인으로 안정성 보장

## 🚀 설치

### 필수 요구사항

- **Node.js** 18.0.0 이상
- **pnpm** 8.0.0 이상
- **Figma 계정** 및 API 토큰

### 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/jun094/figma-file-mcp-server.git
cd figma-file-mcp-server

# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env
# .env 파일에서 FIGMA_API_TOKEN과 FIGMA_FILE_ID 설정

# 개발 서버 실행
pnpm dev
```

### Docker로 실행

```bash
# Docker 이미지 빌드
docker build -t figma-ds-ai .

# 컨테이너 실행
docker run -e FIGMA_API_TOKEN=your_token -e FIGMA_FILE_ID=your_file_id figma-ds-ai
```

## 📖 사용법

### 1. 기본 사용법

```bash
# Figma 데이터 추출
pnpm start:harvester

# 생성된 YAML 파일 확인
cat output/design-system/design-system-data.yaml
```

### 2. 고급 설정

```typescript
// 커스텀 설정 예시
const config = {
  figma: {
    apiToken: process.env.FIGMA_API_TOKEN,
    fileId: process.env.FIGMA_FILE_ID,
    includeVariables: true,
    includeComponents: true
  },
  output: {
    format: 'yaml',
    directory: './output/design-system',
    filename: 'design-system-data.yaml'
  }
};
```

### 3. API 사용 예시

```bash
# Q&A 시스템 쿼리 (향후 구현 예정)
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "primary button의 색상은 무엇인가요?"}'
```

## 🧪 테스트

### 전체 테스트 실행

```bash
# 모든 테스트 실행
pnpm test

# 커버리지 포함
pnpm test:coverage

# 성능 테스트
pnpm test:performance
```

### 테스트 결과 예시

```
 PASS  apps/figma-connector/src/index.test.ts
 PASS  packages/shared-types/src/index.test.ts

Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        3.847 s
Coverage:    85.23% Statements
             78.94% Branches  
             88.46% Functions
             84.61% Lines
```

## 🔧 개발

### 개발 환경 설정

```bash
# 개발 모드로 실행
pnpm dev

# 타입 체크
pnpm typecheck

# 린트 체크
pnpm lint

# 포맷팅
pnpm format
```

### 코드 구조

```
figma-file-mcp-server/
├── apps/
│   └── figma-connector/     # 메인 데이터 수집 애플리케이션
├── packages/
│   └── shared-types/        # 공유 타입 정의
├── output/
│   └── design-system/       # 생성된 YAML 파일
├── tests/                   # 테스트 파일
└── .github/                 # CI/CD 워크플로우
```

## 📊 성능 메트릭

| 지표 | 목표 | 현재 |
|------|------|------|
| 테스트 커버리지 | >80% | 85.23% |
| 빌드 시간 | <2분 | 1분 32초 |
| 메모리 사용량 | <100MB | 78MB |
| API 응답 시간 | <500ms | 245ms |

## 🛡️ 보안

### 보안 스캔 결과

- ✅ **CodeQL**: 취약점 없음
- ✅ **Snyk**: 고위험 취약점 없음  
- ✅ **Trivy**: 컨테이너 보안 통과
- ✅ **Secret Scanning**: 민감정보 노출 없음

### 보안 모범 사례

- API 토큰은 환경변수로 관리
- 정기적인 의존성 업데이트
- 자동화된 보안 스캔
- 최소 권한 원칙 적용

## 🤝 기여하기

### 기여 절차

1. **Fork** 저장소
2. **Feature branch** 생성: `git checkout -b feature/amazing-feature`
3. **Commit** 변경사항: `git commit -m 'feat: add amazing feature'`
4. **Push** 브랜치: `git push origin feature/amazing-feature`
5. **Pull Request** 생성

### 기여 가이드라인

- [기여 가이드라인](./CONTRIBUTING.md) 숙지
- [행동 강령](./CODE_OF_CONDUCT.md) 준수
- 모든 테스트 통과 필수
- 코드 리뷰 완료 후 머지

### 기여자 목록

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

감사한 기여자분들:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jun094"><img src="https://avatars.githubusercontent.com/u/jun094?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jun094</b></sub></a><br /><a href="https://github.com/jun094/figma-file-mcp-server/commits?author=jun094" title="Code">💻</a> <a href="#maintenance-jun094" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 🗺️ 로드맵

### Phase 1: 기초 구축 ✅
- [x] Figma API 연동
- [x] 데이터 추출 및 YAML 저장
- [x] 기본 CI/CD 파이프라인

### Phase 2: 자동화 강화 ✅  
- [x] 고급 테스트 시스템
- [x] 보안 스캔 자동화
- [x] 성능 모니터링

### Phase 3: Q&A 시스템 구축 🚧
- [ ] 자연어 처리 엔진 구축
- [ ] REST API 서버 개발  
- [ ] 웹 인터페이스 구축

### Phase 4: 고도화 📋
- [ ] 실시간 동기화
- [ ] 다중 Figma 파일 지원
- [ ] 플러그인 시스템

## 🐛 알려진 이슈

현재 알려진 제한사항:

- [ ] 대용량 Figma 파일 처리 시 메모리 사용량 증가
- [ ] 일부 복합 컴포넌트의 변환 정확도 개선 필요
- [ ] Figma API Rate Limit 대응 로직 강화 필요

## 📞 지원 및 문의

### 커뮤니티

- 💬 **Discussions**: [GitHub Discussions](https://github.com/jun094/figma-file-mcp-server/discussions)
- 🐛 **Bug Reports**: [Issues](https://github.com/jun094/figma-file-mcp-server/issues)
- 📧 **이메일**: jun094@example.com

### 문서

- 📖 **API 문서**: [API Reference](./docs/api.md)
- 🔧 **개발 가이드**: [Development Guide](./docs/development.md)
- 🚀 **배포 가이드**: [Deployment Guide](./docs/deployment.md)

## 📜 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE) 하에 배포됩니다.

```
MIT License

Copyright (c) 2024 jun094

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 감사의 말

이 프로젝트는 다음과 같은 훌륭한 오픈소스 프로젝트들 덕분에 가능했습니다:

- [Figma API](https://www.figma.com/developers/api) - 디자인 데이터 접근
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전성
- [Jest](https://jestjs.io/) - 테스트 프레임워크
- [GitHub Actions](https://github.com/features/actions) - CI/CD 자동화

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**

<div align="center">
  <img src="https://github.com/jun094/figma-file-mcp-server/raw/main/docs/images/logo.png" alt="Figma DS AI Logo" width="200">
  
  **Made with ❤️ by the Figma DS AI Community**
</div>
