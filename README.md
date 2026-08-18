# skala-vue

SKALA Vue.js 실습 과제. 4반 박영서

## 실행

```
npm install
npm run dev
```

http://localhost:5173

## 실습 내용 (2026-08-18)

- 프로젝트 생성 (p48-56): Vite 기반 Vue 3, Router / Pinia / ESLint / Prettier 포함
- 프로젝트 구조 확인 (p58-62): index.html에서 main.js로, main.js에서 App.vue로 이어지는 진입 경로 확인
- App.vue 구성 (p68-69): 기본 스캐폴딩 화면을 비우고 실습 컴포넌트를 갈아 끼우는 구조로 교체. 실습 파일은 `src/components/practices/` 아래 분류
- 반응형 데이터 (p70): `SampleOne.vue`에서 일반 변수와 `ref()` 변수를 각각 버튼으로 증가시켜 화면 갱신 차이 비교
- 텍스트 보간법 (p71): `SampleTwo.vue`에서 보간법 안에 JavaScript 표현식을 넣어 출력
- v-html, v-text (p74-76): 문자열을 HTML로 해석해 주입하는 v-html과 XSS 노출 확인, v-text 및 보간법과 결과 비교
- v-bind (p77-81): href, src, disabled 동적 바인딩과 클래스 바인딩, 스타일 바인딩
