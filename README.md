# skala-vue

SKALA Vue.js 실습 과제. 4반 박영서

## 실행

```
npm install
npm run dev
```

http://localhost:5173

## 구성

화면을 라우터로 나눴다. 맨 위 색인에서 최종본, 과제 1~5, 문법 실습으로 바로 간다. 첫 화면만 미리 싣고 나머지는 지연 로딩으로 걸어 뒀다.

- `/`, `/about`, `/weather/:cityId` — 최종본의 대시보드와 서비스 소개, 도시 상세
- `/exercise/1`, `/exercise/2`, `/exercise/3` — 과제 1, 2, 3
- `/exercise/4`, `/exercise/4/about`, `/exercise/4/weather/:cityId` — 과제 4
- `/exercise/5`, `/exercise/5/about`, `/exercise/5/weather/:cityId` — 과제 5
- `/practice/basic`을 비롯한 여덟 단원 — 문법 실습
- 어디에도 걸리지 않는 주소는 `NotFoundView.vue`가 받는다

각 화면의 역할은 이렇다.

- `src/views/final/` — 그때까지 배운 것을 모두 반영한 누적본. 새 단원이 끝날 때마다 여기를 고친다
- 과제 1, 2, 3은 `src/views/exercise/`, 과제 4와 5는 그 아래 `ex4`, `ex5`에 둔다. 제출한 그대로 둔 스냅샷이라 뒤 단원 문법을 섞지 않는다
- 문법 실습은 `src/views/practice/` 아래에서 단원별로 나뉘고 `PracticeNav.vue`가 그 색인을 그린다
- 자식 컴포넌트(`BaseDashboardCard`, `SearchBar`, `WeatherCard`, `WeatherSummary`, `WeatherSubNav`)는 최종본과 과제들이 함께 쓴다

## 실행에 필요한 키

Axios 실습의 Open Weather 예제는 API 키가 있어야 돈다. `.env.example`을 복사해 `.env.local`을 만들고 본인 키를 넣는다. `.env.local`은 gitignore 대상이라 저장소에 올라가지 않는다.

```
VITE_OPENWEATHER_API_KEY=발급받은_키
```

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

### 4일차 (2026-08-21)

#### 과제 4: Weather Router (p196)

`src/views/exercise/ex4/` 아래 화면 세 개와 `src/router/index.js`

- 라우터에 지연 로딩을 걸었다. 첫 화면만 미리 싣고 나머지는 그 경로에 처음 들어갈 때 청크를 따로 받는다
- Catch-all Route를 등록 목록 맨 끝에 두고 `NotFoundView.vue`로 보낸다. 없는 주소에서 화면이 하얗게 비는 것을 막는다
- `App.vue`는 상단 색인과 `router-view`만 남긴 껍데기로 줄였다. 한 페이지에 쌓아 두던 화면을 전부 경로로 떼어냈다
- `WeatherHomeView.vue`는 과제 3의 `WeatherParent`를 대체한다. 상세보기 버튼에서 `window.alert()`을 걷어내고 `router.push`로 상세 경로를 연다
- `WeatherDetailView.vue`는 주소의 `cityId`를 받아 Mount 시점에 Mock Data에서 도시 객체를 고른다
- `WeatherAboutView.vue`는 서비스 소개 정적 페이지다. 대시보드 홈으로 돌아가는 버튼을 뒀다

개인 추가

- `WeatherSubNav.vue`로 대시보드와 서비스 소개를 오가는 줄을 따로 뺐다. 과제 5와 최종본이 같이 쓴다
- 상세 화면에 이전, 다음 도시로 넘어가는 `router-link`를 두고 경로를 도시 id로 만들었다. 같은 화면에서 파라미터만 바뀔 때는 Mount가 다시 일어나지 않아 `watch`로 따로 잡았다
- 상세 화면에 주소 파라미터 cityId를 그대로 찍어 뒀다
- 과제 1, 2, 3과 문법 실습도 전부 경로로 떼어내고 맨 위에 색인을 뒀다. 한 페이지를 길게 스크롤하지 않아도 된다
- 문법 실습은 40개가 한 화면에 몰려 있어 단원별로 쪼개고 `PracticeNav.vue`로 하위 색인을 달았다

#### 문법 실습 (p197-211)

- Pinia와 provide/inject 비교: 소규모 데이터 전달은 provide/inject로 가볍게 한다. 앱 전체에서 얽히고 디버깅이 중요한 데이터는 스토어로 관리한다
- Store 핵심 개념: state는 반응형 데이터, getters는 읽기 전용 계산 값, actions는 상태를 바꾸거나 통신하는 함수다
- Pinia 구축 3단계: `main.js`에 `createPinia()` 등록, `stores/` 아래 스토어 파일 생성, 컴포넌트에서 import해 인스턴스를 가동한다. 스토어 함수명은 use와 파일명과 Store를 붙여 짓는다
- Frequent Mistakes: 스토어를 그냥 구조분해하면 반응형 연결이 끊긴다. state와 getters는 `storeToRefs`로 감싸야 하고 actions는 그냥 꺼내도 된다
- 사례연구 authStore: 토큰과 사용자 정보를 스토어에 담고 localStorage로 새로고침을 견딘다. Navigation Guard가 이 스토어를 불러 접근 권한을 검사한다
- Code Challenge (p211): `src/components/practices/library/StoreCounter.vue`에서 스캐폴딩 `counter.js`의 state, getters, actions를 화면에 붙였다

개인 추가

- `src/components/practices/pinia/` 아래에 네 종을 더 만들었다. Option 스타일 스토어, Setup 스타일 스토어, `storeToRefs` 비교, 부모 자식이 아닌 두 컴포넌트의 스토어 공유
- `storeToRefs` 실습은 끊긴 값과 살아 있는 값을 나란히 두고 버튼을 누른다. 구조분해한 쪽만 0에서 멈춘다

#### 과제 5: Weather Store (p212)

`src/stores/configStore.js`와 `src/views/exercise/ex5/` 아래 화면 세 개

- `configStore`는 단위를 담는다. state는 `unit`이고 초기값은 celsius다. getter `unitSymbol`은 현재 단위에 맞는 기호를 내주고 action `toggleUnit`이 섭씨와 화씨를 오간다
- `UnitToggler.vue`는 현재 단위를 보여주고 바꾸는 버튼이다. Navigation Bar 옆에 붙였다
- 메인과 상세 양쪽에 단위 설정을 적용했다. 원본 데이터는 섭씨 숫자로 두고 화씨일 때만 `Math.round((rawTemp * 9) / 5 + 32)`로 변환해 보여준다
- 소개 화면에서 단위를 바꾸고 대시보드로 넘어가도 바뀐 단위가 그대로 붙어 있다

개인 추가

- 요구사항 4번을 추가 스토어 쪽으로 풀었다. `weatherStore.js`가 도시 배열과 검색어, 선택 상태를 state로 쥐고 검색 결과와 평균 기온, 즐겨찾기 수를 getters로 내준다
- `averageTemp`는 다른 getter인 `filteredList`를 참조해야 해서 화살표 함수 대신 일반 함수로 적었다
- `StoreStatusBar.vue`는 props를 하나도 받지 않고 스토어에서 선택 상태를 직접 꺼낸다. 과제 3에서 부모를 거쳐 내려보내던 것과 대비된다
- `WeatherSummary.vue`에 단위 기호 prop을 기본값과 함께 붙였다. 넘기지 않으면 섭씨로 나와 앞 과제 화면은 그대로다

#### 문법 실습 (p213-228)

- HTTP와 REST API: 클라이언트가 요청을 보내고 서버가 응답한다. 메서드는 데이터베이스 CRUD와 맞물린다. 주소는 명사로만 짓고 행위는 메서드로 대신한다
- Fetch와 Axios 비교: Fetch는 설치가 필요 없지만 JSON 변환과 에러 처리를 손으로 해야 한다. Axios는 설치가 필요한 대신 둘 다 자동이고 baseURL과 인터셉터를 지원한다
- Axios 설치: `npm install axios`
- Axios 메서드: `axios.get`, `post`, `put`, `patch`, `delete`가 각각 조회와 생성, 전체 수정, 일부 수정, 삭제를 맡는다. 전부 Promise를 반환한다
- 비동기 호출 방식: `.then` 체이닝과 `async`/`await` 두 갈래가 있다. await 쪽은 위에서 아래로 읽히고 에러는 try catch로 잡는다

#### Code Challenge: Axios (p229)

`src/components/practices/library/` 아래 두 파일

- `AxiosWeather.vue`는 Open Weather를 `await axios.get`으로 호출한다. `isLoading`으로 버튼을 잠그고 try catch finally로 성공과 실패, 뒷정리를 나눴다
- `AxiosJson.vue`는 JSONPlaceholder로 GET, POST, PUT, DELETE를 한 화면에서 돌린다. Mount 시점에 GET으로 세 건만 읽어 온다
- 가상 API라 POST와 PUT의 응답은 정상으로 오지만 서버 데이터가 실제로 바뀌지는 않는다. 응답 객체를 화면 목록에 직접 반영했다

개인 추가

- 교재는 통신 실패를 `alert()`으로 알리지만 화면 안 문구로 바꿨다. 경고창은 눌러서 닫기 전까지 다른 동작을 막는다
- API 키를 코드에 박지 않고 `.env.local`의 `VITE_OPENWEATHER_API_KEY`에서 읽는다. 저장소가 공개라 키가 그대로 올라가면 안 된다

최종본 반영

- 최종본도 대시보드와 서비스 소개, 도시 상세 세 경로로 나누고 `WeatherSubNav.vue`를 붙였다
- 상태는 `finalWeatherStore.js`가 쥐고 `storeToRefs`로 꺼내 쓴다. 단위 전환은 과제 5와 같은 `configStore`를 공유한다
- 모듈로 두던 `src/data/finalWeatherList.js`는 스토어가 대신해서 지웠다
- 도시 목록 데이터는 과제 4 스냅샷과 따로 둔다. 스냅샷과 누적본이 서로의 즐겨찾기를 건드리지 않는다
