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

#### 문법 실습 (p48-81)

- 프로젝트 생성 (p48-56): Vite 기반 Vue 3, Router / Pinia / ESLint / Prettier 포함
- 프로젝트 구조 확인 (p58-62): index.html에서 main.js로, main.js에서 App.vue로 진입 경로가 이어진다
- App.vue 구성 (p68-69): 기본 스캐폴딩 화면을 비우고 실습 컴포넌트를 갈아 끼우는 구조로 교체. 실습 파일은 `src/components/practices/` 아래로 분류해 뒀다
- 반응형 데이터 (p70): `SampleOne.vue`에서 일반 변수와 `ref()` 변수를 각각 버튼으로 증가시켜 보면서 화면 갱신 차이를 비교했다
- 텍스트 보간법 (p71): `SampleTwo.vue`에서 보간법 안에 JavaScript 표현식을 넣어 출력
- v-html, v-text (p74-76): v-html은 문자열을 HTML로 해석해 주입한다. XSS 노출까지 확인하고 v-text, 보간법과 결과를 비교했다
- v-bind (p77-81): href, src, disabled 동적 바인딩에 클래스 바인딩, 스타일 바인딩까지

### 2일차 (2026-08-19)

#### 문법 실습 (p83-115)

- v-bind 단축 문법 (p83): 변수명과 HTML 속성명이 같을 때 `:id`, `:src`로 축약
- v-if, v-show (p84-86): 조건부 렌더링과 조건부 가시성. DOM에서 아예 지우는 쪽과 display none으로 숨기는 쪽을 비교했다
- v-for (p87-88): 배열, 객체, 배열 내 객체를 반복 렌더링하고 `:key` 지정
- v-pre, v-cloak (p89-90): 템플릿 컴파일을 건너뛰고 원문 그대로 출력. 렌더링 전 뼈대 문자열이 노출되는 것도 막는다
- v-once, v-memo (p91-92): 최초 1회만 렌더링하고 이후 갱신 안 함. 지정한 변수가 바뀔 때만 영역 갱신
- Code Challenge (p93): 디렉티브 12종 실습 파일 확인
- v-on 이벤트 핸들링 (p94-96): 인라인 방식은 태그 안에서 바로 처리하고 메서드 방식은 스크립트 함수를 연결한다
- 이벤트 객체 (p97-100): 인자 없이 받는 방식과 `$event`로 데이터와 함께 넘기는 방식. 좌표와 클릭된 태그를 확인했다
- 이벤트 수식어 (p101-104): `.prevent`로 링크 기본 이동을 막고 `.stop`으로 버블링을 차단
- Code Challenge (p105): 이벤트 실습 3종 파일
- v-model 양방향 바인딩 (p106): v-model 축약형과 `:value` + `@input`으로 분해한 형태를 나란히 놓고 비교했다
- 폼 요소 매핑 (p107-109): textarea, 단일 및 다중 checkbox, radio, select별로 ref 초기값 타입을 맞춰 바인딩
- v-model 수식어 (p110-112): `.lazy`, `.number`, `.trim`과 체이닝을 적용했을 때의 결과와 타입 변화를 확인했다
- Vue Style (p113-114): `scoped`로 적용 범위를 컴포넌트 내부로 제한하고 `@import`로 외부 CSS 연결
- Code Challenge (p115): 폼 바인딩 3종, 스타일 실습 파일

#### 과제 1: Weather Mockup (p116)

`src/components/exercise/WeatherMockup.vue`

- 도시 6곳의 날씨 배열을 v-for로 카드 출력하고 `:key`에 id 바인딩
- 기온 25도 기준으로 더움과 선선함 라벨을 v-if로 분기
- 도시 검색 입력은 `:value` + `@input`으로 처리해 한글 조합 중 입력이 끊기지 않게 함
- 카드를 누르면 상태바에 선택 도시 표시. 상세보기 버튼은 `@click.stop`으로 버블링을 막고 alert 출력

개인 추가

- 체감온도, 습도, 풍속 항목 추가
- 도시 3곳 추가 (광주, 강릉, 제주)
- 선택한 카드를 클래스 바인딩으로 강조
- 카드별 즐겨찾기 토글

#### 문법 실습 (p117-144)

- Composition API 개요 (p117-120): `<script setup>`에 데이터와 로직을 모아 쓰는 방식. `createApp()`이 맡는 전역 등록 역할도 확인했다
- ref (p121-122): 원시값과 배열, 객체를 감싸 반응형으로 만들고 스크립트에서는 `.value`로 접근
- reactive (p123-124): 객체와 배열 전용 반응형. 통째로 재할당하면 반응성이 끊겨 push, splice로 다룸
- Code Challenge (p126): ref, reactive 실습 파일
- computed (p127-129): 의존 데이터가 바뀔 때만 재계산되는 캐싱 동작을 일반 함수와 비교
- watch (p130-133): 단일 변수 하나만 감시하다가 배열로 묶어 다중 소스까지 감시
- watch deep (p134-139): `deep: true`로 객체 전체를 감시했다. 특정 속성을 조준해야 이전 값이 보존되는 차이도 확인
- watchEffect (p141-142): 대상 지정 없이 내부에서 접근한 반응형 데이터를 자동 추적한다. 최초 1회는 즉시 실행
- Code Challenge (p144): computed, watch 실습 6종 파일 확인

### 3일차 (2026-08-20)

#### 과제 2: Weather Composition (p145)

`src/components/exercise/WeatherComposition.vue`

- 검색어, 선택 도시 정보, 날씨 배열을 반응형 상태로 정의
- `computed`로 검색어가 도시 이름에 포함된 항목만 걸러 `filteredWeatherList` 구성
- `watch`로 선택 도시 문구 변화를 감시해 이전값과 새값을 콘솔에 찍었다
- `watchEffect` 쪽은 검색어 입력을 자동 추적해 콘솔에 기록
- 검색어가 비면 전체 출력, 일치 항목이 없으면 안내 문구 표시

개인 추가

- 25도 이상만 보기 체크박스를 반응형 상태로 추가하고 검색어와 함께 필터에 반영
- 표시 중인 도시의 평균 기온을 computed로 계산
- 즐겨찾기 개수는 computed로 계산하고 그 값의 변화는 watch로 감시

#### 문법 실습 (p146-177)

- 컴포넌트 지역 등록 (p146-149): 부모가 자식을 import하면 PascalCase와 kebab-case 둘 다로 쓸 수 있다
- 컴포넌트 전역 등록 (p150-151): main.js에서 `app.component()`로 올려두면 어느 파일에서든 import 없이 쓴다
- 라이프사이클 훅 (p152-154): 생성, 부착, 갱신, 소멸 네 단계를 콘솔로 추적. `onMounted`에서 켠 타이머를 `onUnmounted`에서 끄지 않으면 컴포넌트가 사라져도 계속 돈다
- Code Challenge (p155): 라이프사이클 실습 파일
- Props (p156-164): 부모가 내려준 값은 자식이 고칠 수 없다. 타입과 필수 여부, 기본값, 커스텀 검사기까지 걸어 봤다. 배열과 객체의 기본값만 함수로 반환한다
- Emits (p165-168): 자식이 이벤트에 데이터를 실어 올리면 부모가 받아서 자기 상태를 고친다
- Provide, Inject (p169-171): 중간 컴포넌트를 건너뛰고 조상이 내려둔 값을 바로 꺼내 쓰는 방식
- Code Challenge (p172): Props, Emits 실습 파일
- Slot (p173-176): props가 데이터를 넘긴다면 slot은 마크업 자체를 넘긴다. 이름 없는 기본 슬롯, 자리를 여러 개 둔 이름 슬롯, 자식이 가진 데이터를 부모가 받아 그리는 스코프 슬롯 세 가지
- Code Challenge (p177): Slot 실습 파일

#### 과제 3: Weather Component (p178)

`src/components/exercise/` 아래 5개 파일

- `WeatherParent.vue`가 반응형 데이터와 computed, watcher를 전부 쥐고 있다
- `BaseDashboardCard.vue`는 검색박스와 리스트박스의 테두리 디자인만 맡고 안쪽은 slot으로 비워 뒀다
- `SearchBar.vue`는 검색어를 props로 받아 표시하고 입력이 바뀌면 update-query로 올려보낸다
- `WeatherCard.vue`는 도시 객체를 받아 그리고 select-card, click-detail, toggle-favorite 세 이벤트를 부모로 보낸다
- 각 컴포넌트의 디자인은 자기 파일의 `<style scoped>`로 나눠 담았다

개인 추가

- 요약 줄을 `WeatherSummary.vue`로 한 번 더 떼어내 computed 결과 네 개를 props로 받게 했다
- 즐겨찾기는 자식이 직접 고치지 않고 부모에게 요청만 보낸다. props는 읽기 전용이라 값을 바꾸는 쪽은 데이터를 쥔 부모여야 한다
