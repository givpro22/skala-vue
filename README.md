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
- v-on 이벤트 핸들링 (p94-96): 태그 안에서 바로 처리하는 인라인 방식과 스크립트 함수를 연결하는 메서드 방식
- 이벤트 객체 (p97-100): 인자 없이 받는 방식과 `$event`로 데이터와 함께 넘기는 방식으로 좌표, 클릭된 태그 확인
- 이벤트 수식어 (p101-104): `.prevent`로 링크 기본 이동 차단, `.stop`으로 버블링 차단
- Code Challenge (p105): 이벤트 실습 3종 파일 확인
- v-model 양방향 바인딩 (p106): v-model 축약형과 `:value` + `@input`으로 분해한 형태를 나란히 비교
- 폼 요소 매핑 (p107-109): textarea, 단일 및 다중 checkbox, radio, select별로 ref 초기값 타입을 맞춰 바인딩
- v-model 수식어 (p110-112): `.lazy`, `.number`, `.trim`과 체이닝 적용 결과와 타입 변화 확인
- Vue Style (p113-114): `scoped`로 적용 범위를 컴포넌트 내부로 제한, `@import`로 외부 CSS 연결
- Code Challenge (p115): 폼 바인딩 3종과 스타일 실습 파일 확인

#### Hands on - Weather Mockup (p116)

`src/components/exercise/WeatherMockup.vue`

- 도시 6곳의 날씨 배열을 v-for로 카드 출력하고 `:key`에 id 바인딩
- 기온 25도 기준으로 더움과 선선함 라벨을 v-if로 분기
- 도시 검색 입력은 `:value` + `@input`으로 처리해 한글 조합 중 입력이 끊기지 않게 함
- 카드를 누르면 상태바에 선택 도시를 표시하고, 상세보기 버튼은 `@click.stop`으로 버블링을 막고 alert 출력

개인 추가

- 체감온도, 습도, 풍속 항목 추가
- 도시 3곳 추가 (광주, 강릉, 제주)
- 선택한 카드를 클래스 바인딩으로 강조
- 카드별 즐겨찾기 토글
