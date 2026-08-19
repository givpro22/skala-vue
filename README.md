# skala-vue

SKALA Vue.js 실습 과제. 4반 박영서

## 실행

```
npm install
npm run dev
```

http://localhost:5173

## 실습 내용

### 1일차 (2026-08-18)

- 프로젝트 생성 (p48-56): Vite 기반 Vue 3, Router / Pinia / ESLint / Prettier 포함
- 프로젝트 구조 확인 (p58-62): index.html에서 main.js로, main.js에서 App.vue로 이어지는 진입 경로 확인
- App.vue 구성 (p68-69): 기본 스캐폴딩 화면을 비우고 실습 컴포넌트를 갈아 끼우는 구조로 교체. 실습 파일은 `src/components/practices/` 아래 분류
- 반응형 데이터 (p70): `SampleOne.vue`에서 일반 변수와 `ref()` 변수를 각각 버튼으로 증가시켜 화면 갱신 차이 비교
- 텍스트 보간법 (p71): `SampleTwo.vue`에서 보간법 안에 JavaScript 표현식을 넣어 출력
- v-html, v-text (p74-76): 문자열을 HTML로 해석해 주입하는 v-html과 XSS 노출 확인, v-text 및 보간법과 결과 비교
- v-bind (p77-81): href, src, disabled 동적 바인딩과 클래스 바인딩, 스타일 바인딩

### 2일차 (2026-08-19)

- v-bind 단축 문법 (p83): 변수명과 HTML 속성명이 같을 때 `:id`, `:src`로 축약
- v-if, v-show (p84-86): 조건부 렌더링과 조건부 가시성. DOM에서 지우는 방식과 display none으로 숨기는 방식 비교
- v-for (p87-88): 배열, 객체, 배열 내 객체를 반복 렌더링하고 `:key` 지정
- v-pre, v-cloak (p89-90): 템플릿 컴파일을 건너뛰고 원문 출력, 렌더링 전 뼈대 문자열 노출 방지
- v-once, v-memo (p91-92): 최초 1회만 렌더링하고 이후 갱신하지 않기, 지정한 변수가 바뀔 때만 영역 갱신
- Code Challenge (p93): 디렉티브 12종 실습 파일 확인
