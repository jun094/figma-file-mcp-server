## 📝 Figma Design System Q&A MCP 서버 개발 계획서

### 1. 프로젝트 개요

- **프로젝트명:** Figma Design System Q&A Server (가칭: DesignQuery)
- **목표:**
  1. Figma API를 통해 디자인 시스템 정보(Variables, Components, Component Sets, Figma Code Connect 정보)를 추출.
  2. 추출된 데이터를 구조화하여 YAML 형태로 로컬에 저장 및 관리.
  3. 저장된 YAML 데이터를 기반으로 자연어 질의응답이 가능한 MCP (Model-Controller-Presenter/Processor) 서버 구축.
  4. 오픈소스로 공개하여 커뮤니티 기여 및 활용 증진.
- **기대 효과:**
  - 디자인 시스템 정보에 대한 접근성 향상.
  - 디자이너-개발자 간 소통 비용 절감.
  - 디자인 시스템 활용도 증진 및 일관성 유지에 기여.
  - Figma 데이터의 로컬 백업 및 버전 관리 가능성 타진.

---

### 2. 핵심 기능

- **Figma 데이터 추출 모듈:**
  - Figma API 연동 (Access Token 관리 필요)
  - 지정된 Figma File ID로부터 Variables, Components, Component Sets, Code Connect 정보 조회
  - 데이터 필터링 및 정제 기능
- **YAML 데이터 저장 및 관리 모듈:**
  - **YAML 사용 이유:**
    - **상호 운용성:** "frame link의 figma mcp server" 등 기존 또는 향후 개발될 관련 시스템과의 데이터 호환성 확보.
    - **가독성:** 사람이 쉽게 읽고 이해할 수 있는 데이터 형식으로, 디버깅 및 수동 데이터 검토에 용이.
    - **구조적 데이터 표현:** Figma의 계층적이고 복잡한 디자인 시스템 정보를 효과적으로 표현 가능.
  - Figma 객체 구조를 반영한 YAML 스키마 정의.
  - 추출된 데이터를 YAML 파일로 변환 및 저장.
  - 데이터 변경 감지 및 업데이트 기능 (예: 주기적 동기화 또는 Webhook 기반).
- **질의응답(Q&A) 엔진:**
  - YAML 데이터 파싱 및 검색 기능.
  - 자연어 처리(NLP)를 통한 사용자 질의 이해 (초기에는 키워드 기반, 추후 개선).
  - 질의에 대한 답변 생성 (관련 컴포넌트 정보, 변수 값, Code Connect 스니펫 등).
- **MCP 서버 (API):**
  - 데이터 동기화 요청 API.
  - 디자인 시스템 질의응답 API (e.g., `/ask?q=primary color code`).
  - (선택) 간단한 웹 인터페이스 제공하여 질의 테스트.

---

### 3. 기술 스택

- **프로그래밍 언어:** **TypeScript** (Node.js 런타임 기반)
- **Figma API 클라이언트:** `axios` 라이브러리를 활용한 직접 호출 또는 기존 TypeScript Figma API Wrapper (예: `figma-api` 패키지)
- **YAML 처리:** `js-yaml` 라이브러리 또는 유사 TypeScript/JavaScript 라이브러리
- **웹 프레임워크/API 서버:** **Express.js** 또는 **NestJS** (NestJS가 타입스크립트 기반의 구조화된 애플리케이션 개발에 유리)
- **자연어 처리 (Q&A 엔진):**
  - **초기:** 단순 키워드 매칭, 정규 표현식
  - **향후 확장:**
    - 문장 임베딩 (e.g., Sentence Transformers의 JavaScript/TypeScript 버전 또는 유사 라이브러리) 및 벡터 유사도 검색 (e.g., FAISS.js, ChromaDB 클라이언트)
    - 소규모 언어 모델(SLM) 또는 LLM 기반 RAG (Retrieval Augmented Generation) 파이프라인 구축 (LangChain.js 등 활용)
- **데이터베이스:** **파일 시스템 기반 YAML** (별도의 DB 시스템 사용하지 않음)
- **형상 관리:** Git & GitHub (오픈소스이므로)
- **문서화:** README.md 및 코드 내 주석을 통한 핵심 내용 문서화

---

### 4. 개발 단계

**Phase 1: 기초 연구 및 설계**

- [ ] Figma API 상세 명세 분석 (Variables, Components, Code Connect 관련)
- [ ] YAML 데이터 스키마 상세 설계 (Figma 객체 구조 매핑 및 확장성 고려)
- [ ] Q&A 질의 유형 및 답변 형식 정의
- [ ] 개발 환경 구축 (TypeScript, Node.js, Git 등)

**Phase 2: Figma 데이터 추출 및 YAML 저장 모듈 개발**

- [ ] Figma API 인증 및 기본 데이터 요청 기능 구현
- [ ] Variables, Components, Component Sets, Code Connect 데이터 추출 로직 개발
- [ ] 추출된 데이터를 정의된 스키마에 따라 YAML 파일로 저장하는 기능 구현
- [ ] 로컬 파일 저장 및 관리 로직 (덮어쓰기, 버전 관리 기초)
- [ ] CLI (Command Line Interface)를 통한 수동 데이터 추출 기능 구현

**Phase 3: Q&A 엔진 (초급) 및 API 서버 개발**

- [ ] YAML 데이터 로딩 및 파싱 기능 구현
- [ ] 키워드 기반 검색 및 질의 처리 로직 개발 (예: "primary button 배경색 알려줘")
- [ ] 선택한 웹 프레임워크(Express.js 또는 NestJS)를 이용한 기본 API 엔드포인트 설계 및 구현
  - `/sync-figma`: Figma 데이터 동기화 (YAML 파일 업데이트)
  - `/ask`: 질의응답 처리
- [ ] API 요청/응답 데이터 모델 정의 (TypeScript 인터페이스 활용)

**Phase 4: Q&A 엔진 개선 및 고급 기능 (선택적 초기 릴리즈 후 진행 가능)**

- [ ] NLP 라이브러리 도입 검토 및 적용 (기본적인 의도 파악)
- [ ] (선택적) 임베딩 기반 검색 도입 위한 데이터 전처리 및 벡터 스토어 연동
- [ ] (선택적) LangChain.js 등을 활용한 RAG 파이프라인 구축 실험
- [ ] 답변 형식 다양화 및 정확도 개선

**Phase 5: 테스트, 문서화 및 배포 준비**

- [ ] 단위 테스트 및 통합 테스트 작성 (Jest, Mocha 등 활용)
- [ ] 사용자 가이드 및 API 사용법 README.md에 상세 기술
- [ ] Dockerfile 작성 (배포 용이성 확보)
- [ ] GitHub 리포지토리 설정 및 초기 버전 릴리즈 준비
