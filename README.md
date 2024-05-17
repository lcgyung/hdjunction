# 에이치디정션 프론트엔드 과제

## 개발 환경

- nodejs v20.11.1

## 설치 및 실행

### 설치

```
$ yarn
```

### 실행

```
$ yarn dev
```

### 접속

```
$ http://localhost:5173
```

## 구성

### 의존성

- React
- Typescript
- eslint: 코드 품질 유지
- vite: 번들 사이즈 축소, 빠른 개발 속도
- styled-components: 모듈화, 코드 경량화

```
{
  "name": "working-hdjunction",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^6.1.11"
  },
  "devDependencies": {
    "@types/node": "^20.12.11",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@types/styled-components": "^5.1.34",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vite-plugin-checker": "^0.6.4",
    "vite-plugin-eslint": "^1.8.1",
    "vitest": "^1.6.0"
  }
}
```

### 구조

```
.
├── public
├── src
│   ├── __tests__
│   ├── components
│   │   ├── Canvas
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── Tabs
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── index.ts
│   ├── styles
│   │   ├── reset.css
│   ├── typings
│   │   └── interfaces.ts
│   │   └── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── styled.ts
│   ├── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── LICENSE
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.js
└── yarn.lock
```

## 체크리스트 - 기능 명세

- [v] `필수` 마우스를 드래그해서 사각형을 그릴 수 있습니다.
- [v] `필수` 마우스를 드래그해서 원을 그릴 수 있습니다.
- [v] `필수` 모든 도형을 일괄 삭제할 수 있습니다.
- [v] `필수` 그려진 도형은 Client-side storage에 저장되어 페이지를 새로고침 해도 유지되어야 합니다.
- [v] 도형을 선택해서 삭제할 수 있습니다.
- [v] 도형을 선택한 후 드래그로 위치를 바꿀 수 있습니다.

## 체크리스트 - 요구사항

- [v] 결과물은 Chrome 최신 버전에서 동작해야 합니다.
- [v] JavaScript(ES6+), 또는 TypeScript로 작성하세요.
- [v] React.js를 사용해 구현하세요.
- [v] 도형의 모양을 조작하는 기능(e.g. 도형 그리기, 위치 이동하기, 크기 조정하기)은 직접 구현하세요.
  - Canvas API는 사용할 수 없습니다. DOM으로 구현하세요.
  - 해당 기능 구현에 직접적인 영향을 주는 라이브러리는 사용할 수 없습니다. (e.g. interact.js, Framer Motion)
- [v] 라이브러리는 위의 요구사항을 준수하는 선에서 자유롭게 사용하세요.
- [v] 소스 코드는 Git으로 관리하세요.
  - GitHub, GitLab, Bitbucket 등의 무료 Git 호스팅 서비스를 사용하세요.
  - repository 접근 권한을 public으로 설정하세요.
  - 작업 단위별로 commit을 생성하고, 메시지를 신경써서 작성하세요.
  - 작업 단위를 나누기 위해 branch를 생성했다면, merge 후에도 삭제하지 말고 최대한 남겨주세요.
- [v] README.md 파일에 프로젝트를 소개해주세요.

## 구현 설명

- 코드 품질 : ESLint 사용, 도메인 별 컴포넌트 분리, 정기적인 리팩토링
- 프로젝트 설계 : 최소한에 번들과 코드 목표
- 렌더링 성능 : 별도 메모이제이션 처리 X, 소규모이기 때문에 큰 이점이 없다고 판단
- Git 활용도 : Git-Flow 채택
