# skala-vue

SKALA Vue.js 실습 과제. 4반 박영서

## 실행

```
npm install
npm run dev
```

http://localhost:5173

## 구성

화면을 라우터로 나눴다. 맨 위 색인에서 최종본, 과제 1~7, 문법 실습으로 바로 간다. 첫 화면만 미리 싣고 나머지는 지연 로딩으로 걸어 뒀다.

- `/`, `/about`, `/weather/:cityId` — 최종본의 대시보드와 서비스 소개, 도시 상세
- `/exercise/1`, `/exercise/2`, `/exercise/3` — 과제 1, 2, 3
- `/exercise/4`, `/exercise/4/about`, `/exercise/4/weather/:cityId` — 과제 4
- `/exercise/5`, `/exercise/5/about`, `/exercise/5/weather/:cityId` — 과제 5
- `/exercise/6`, `/exercise/6/about`, `/exercise/6/weather/:cityId` — 과제 6
- `/exercise/7`, `/exercise/7/about`, `/exercise/7/weather/:cityId` — 과제 7
- `/practice/basic`을 비롯한 아홉 단원 — 문법 실습
- 어디에도 걸리지 않는 주소는 `NotFoundView.vue`가 받는다

각 화면의 역할은 이렇다.

- `src/views/final/` — 그때까지 배운 것을 모두 반영한 누적본. 새 단원이 끝날 때마다 여기를 고친다
- 과제 1, 2, 3은 `src/views/exercise/`, 과제 4부터는 그 아래 `ex4`에서 `ex7`까지에 둔다. 제출한 그대로 둔 스냅샷이라 뒤 단원 문법을 섞지 않는다
- 문법 실습은 `src/views/practice/` 아래에서 단원별로 나뉘고 `PracticeNav.vue`가 그 색인을 그린다
- 자식 컴포넌트(`BaseDashboardCard`, `SearchBar`, `WeatherCard`, `WeatherSummary`, `WeatherSubNav`)는 최종본과 과제들이 함께 쓴다

## 실행에 필요한 키

과제 6과 7, 최종본, Axios 실습은 OpenWeatherMap 키가 있어야 돈다. `.env.example`을 복사해 `.env.local`을 만들고 본인 키를 넣는다. `.env.local`은 gitignore 대상이라 저장소에 올라가지 않는다.

```
VITE_OPENWEATHER_API_KEY=발급받은_키
```

## 실습 내용

### 1일차 (2026-08-18)

#### 문법 실습 (p48-81)

Vite 기반 Vue 3로 프로젝트를 생성하면서 Router와 Pinia, ESLint, Prettier를 함께 넣었다(p48-56). 그다음 index.html에서 main.js로, main.js에서 App.vue로 이어지는 진입 경로를 따라가며 구조를 확인했고(p58-62), 기본 스캐폴딩 화면은 비운 뒤 실습 컴포넌트를 갈아 끼우는 구조로 App.vue를 교체했다(p68-69). 실습 파일은 `src/components/practices/` 아래로 분류해 뒀다.

값이 화면에 실리는 방식부터 봤다. `SampleOne.vue`에서 일반 변수와 `ref()` 변수를 각각 버튼으로 증가시켜 보면서 화면 갱신 차이를 비교한 것이 반응형 데이터 실습이고(p70), `SampleTwo.vue`에서는 텍스트 보간법 안에 JavaScript 표현식을 넣어 출력했다(p71).

디렉티브는 v-html과 v-text를 먼저 붙였다. v-html이 문자열을 HTML로 해석해 주입하는 탓에 XSS 노출까지 확인하고 v-text, 보간법과 결과를 비교했다(p74-76). v-bind는 href, src, disabled 동적 바인딩에 클래스 바인딩, 스타일 바인딩까지 이어졌다(p77-81).

### 2일차 (2026-08-19)

#### 문법 실습 (p83-115)

둘째 날은 디렉티브가 대부분이다. 변수명과 HTML 속성명이 같을 때 `:id`, `:src`로 축약하는 v-bind 단축 문법이 시작이었다(p83). 조건 쪽은 조건부 렌더링과 조건부 가시성이다. v-if와 v-show를 나란히 놓고, DOM에서 아예 지우는 쪽과 display none으로 숨기는 쪽을 비교했다(p84-86). v-for는 배열, 객체, 배열 내 객체를 반복 렌더링하면서 `:key`를 지정하는 데까지 갔다(p87-88).

나머지 넷은 렌더링을 건너뛰거나 붙잡아 두는 쪽이다.

- v-pre, v-cloak은 템플릿 컴파일을 건너뛰고 원문 그대로 출력한다. 렌더링 전 뼈대 문자열이 노출되는 것도 막는다 (p89-90)
- v-once, v-memo는 최초 1회만 렌더링하고 이후 갱신하지 않는다. 지정한 변수가 바뀔 때만 영역을 갱신한다 (p91-92)

디렉티브 12종 실습 파일은 Code Challenge에서 확인했다(p93).

v-on 이벤트 핸들링은 인라인 방식과 메서드 방식을 함께 봤다. 태그 안에서 바로 처리하는 쪽과 스크립트 함수를 연결하는 쪽이다(p94-96). 이벤트 객체는 인자 없이 받는 방식과 `$event`로 데이터와 함께 넘기는 방식을 각각 써서 좌표와 클릭된 태그를 확인했고(p97-100), 수식어는 `.prevent`로 링크 기본 이동을 막고 `.stop`으로 버블링을 차단하는 데 썼다(p101-104). 이벤트 실습 3종 파일이 p105 Code Challenge다.

폼 쪽은 v-model이 중심이다. 양방향 바인딩 축약형과 `:value` + `@input`으로 분해한 형태를 나란히 놓고 비교했다(p106). 요소별로는 textarea, 단일 및 다중 checkbox, radio, select를 각각 바인딩했는데, ref 초기값 타입을 요소에 맞춰야 했다(p107-109). 수식어 `.lazy`, `.number`, `.trim`은 체이닝까지 적용해 결과와 타입 변화를 확인했다(p110-112). Vue Style에서는 `scoped`로 적용 범위를 컴포넌트 내부로 제한하고 `@import`로 외부 CSS를 연결했다(p113-114). 폼 바인딩 3종과 스타일 실습 파일이 마지막 Code Challenge에 있다(p115).

#### 과제 1: Weather Mockup (p116)

`src/components/exercise/WeatherMockup.vue`

배운 디렉티브를 한 화면에 모은 첫 과제다. 도시 6곳의 날씨 배열을 v-for로 카드 출력하고 `:key`에 id를 바인딩했다. 기온 25도 기준으로 더움과 선선함 라벨을 v-if로 분기했고, 카드를 누르면 상태바에 선택 도시가 뜬다. 상세보기 버튼은 `@click.stop`으로 버블링을 막고 alert을 출력한다. 도시 검색 입력만 따로인데, 한글 조합 중 입력이 끊기지 않아야 해서 `:value` + `@input`으로 처리했다.

요구사항 밖으로 더 붙인 것도 있다. 체감온도, 습도, 풍속 항목을 추가하고 도시 3곳(광주, 강릉, 제주)을 늘렸다. 선택한 카드는 클래스 바인딩으로 강조하고, 카드별 즐겨찾기 토글을 달았다.

#### 문법 실습 (p117-144)

`<script setup>`에 데이터와 로직을 모아 쓰는 Composition API로 넘어왔다. `createApp()`이 맡는 전역 등록 역할도 확인했다(p117-120).

상태를 만드는 방법은 둘이다. ref는 원시값과 배열, 객체를 감싸 반응형으로 만들고 스크립트에서는 `.value`로 접근한다(p121-122). reactive는 객체와 배열 전용 반응형인데, 통째로 재할당하면 반응성이 끊겨 push, splice로 다뤘다(p123-124). 두 실습 파일은 p126 Code Challenge에 있다.

값을 지켜보는 쪽은 computed와 watch, watchEffect다. computed는 의존 데이터가 바뀔 때만 재계산되는 캐싱 동작을 일반 함수와 비교했다(p127-129). watch는 단일 변수 하나만 감시하다가 배열로 묶어 다중 소스까지 감시했고(p130-133), watch deep은 `deep: true`로 객체 전체를 감시하면서 특정 속성을 조준해야 이전 값이 보존되는 차이도 확인했다(p134-139). watchEffect는 대상 지정 없이 내부에서 접근한 반응형 데이터를 자동 추적한다. 최초 1회는 즉시 실행된다(p141-142). computed, watch 실습 6종 파일은 p144 Code Challenge에서 확인했다.

### 3일차 (2026-08-20)

#### 과제 2: Weather Composition (p145)

`src/components/exercise/WeatherComposition.vue`

검색어와 선택 도시 정보, 날씨 배열을 반응형 상태로 정의하는 데서 시작했다. `computed`로는 검색어가 도시 이름에 포함된 항목만 걸러 `filteredWeatherList`를 구성했고, `watch`로는 선택 도시 문구 변화를 감시해 이전값과 새값을 콘솔에 찍었다. `watchEffect` 쪽은 검색어 입력을 자동 추적해 콘솔에 기록한다. 검색어가 비면 전체를 출력하고, 일치 항목이 없으면 안내 문구를 표시한다.

개인 추가

- 25도 이상만 보기 체크박스를 반응형 상태로 추가하고 검색어와 함께 필터에 반영
- 표시 중인 도시의 평균 기온을 computed로 계산
- 즐겨찾기 개수는 computed로 계산하고 그 값의 변화는 watch로 감시

#### 문법 실습 (p146-177)

컴포넌트를 나누고 그 사이로 데이터를 주고받는 단원이다. 등록은 지역과 전역 두 가지다. 부모가 자식을 import하는 지역 등록이면 PascalCase와 kebab-case 둘 다로 쓸 수 있고(p146-149), main.js에서 `app.component()`로 올려두는 전역 등록이면 어느 파일에서든 import 없이 쓴다(p150-151).

라이프사이클 훅은 생성, 부착, 갱신, 소멸 네 단계를 콘솔로 추적했다(p152-154). `onMounted`에서 켠 타이머를 `onUnmounted`에서 끄지 않으면 컴포넌트가 사라져도 계속 돈다. 라이프사이클 실습 파일은 p155 Code Challenge에 있다.

데이터가 오르내리는 통로는 셋으로 정리됐다.

- 부모가 내려준 값은 자식이 고칠 수 없다. Props에 타입과 필수 여부, 기본값, 커스텀 검사기까지 걸어 봤고 배열과 객체의 기본값만 함수로 반환한다 (p156-164)
- 자식이 이벤트에 데이터를 실어 올리면 부모가 받아서 자기 상태를 고치는 쪽이 Emits다 (p165-168)
- Provide, Inject는 중간 컴포넌트를 건너뛰고 조상이 내려둔 값을 바로 꺼내 쓰는 방식이다 (p169-171)

Props, Emits 실습 파일은 p172 Code Challenge에 있다.

Slot이 넘기는 것은 마크업 자체다. props로 데이터를 내려보내던 것과 여기서 갈린다(p173-176). 이름 없는 기본 슬롯, 자리를 여러 개 둔 이름 슬롯, 자식이 가진 데이터를 부모가 받아 그리는 스코프 슬롯 세 가지를 봤고, Slot 실습 파일은 p177 Code Challenge에 있다.

#### 과제 3: Weather Component (p178)

`src/components/exercise/` 아래 5개 파일

화면을 다섯 파일로 쪼갠 과제다. 반응형 데이터와 computed, watcher는 `WeatherParent.vue`가 전부 쥐고 있다.

- `BaseDashboardCard.vue`는 검색박스와 리스트박스의 테두리 디자인만 맡고 안쪽은 slot으로 비워 뒀다
- `SearchBar.vue`는 검색어를 props로 받아 표시하고 입력이 바뀌면 update-query로 올려보낸다
- `WeatherCard.vue`는 도시 객체를 받아 그리고 select-card, click-detail, toggle-favorite 세 이벤트를 부모로 보낸다

각 컴포넌트의 디자인은 자기 파일의 `<style scoped>`로 나눠 담았다.

요구사항 밖으로는 요약 줄을 `WeatherSummary.vue`로 한 번 더 떼어내 computed 결과 네 개를 props로 받게 했다. 즐겨찾기도 자식이 직접 고치지 않고 부모에게 요청만 보내도록 뒀는데, props는 읽기 전용이라 값을 바꾸는 쪽이 데이터를 쥔 부모여야 하기 때문이다.

### 4일차 (2026-08-21)

#### 과제 4: Weather Router (p196)

`src/views/exercise/ex4/` 아래 화면 세 개와 `src/router/index.js`

한 페이지에 쌓아 두던 화면을 전부 경로로 떼어냈다. `App.vue`는 상단 색인과 `router-view`만 남긴 껍데기로 줄였다.

- 라우터에 지연 로딩을 걸었다. 첫 화면만 미리 싣고 나머지는 그 경로에 처음 들어갈 때 청크를 따로 받는다
- Catch-all Route를 등록 목록 맨 끝에 두고 `NotFoundView.vue`로 보낸다. 없는 주소에서 화면이 하얗게 비는 것을 막는다
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

스토어를 처음 붙인 단원이다. 소규모 데이터 전달은 provide/inject로 가볍게 하고, 앱 전체에서 얽히고 디버깅이 중요한 데이터는 스토어로 관리한다는 것이 Pinia와 provide/inject를 가르는 기준이었다.

Store는 state와 getters, actions로 이뤄진다. state는 반응형 데이터, getters는 읽기 전용 계산 값, actions는 상태를 바꾸거나 통신하는 함수다. 구축은 `main.js`에 `createPinia()` 등록, `stores/` 아래 스토어 파일 생성, 컴포넌트에서 import해 인스턴스를 가동하는 3단계로 밟았다. 스토어 함수명은 use와 파일명과 Store를 붙여 짓는다.

Frequent Mistakes에서 짚은 것은 구조분해다. 스토어를 그냥 구조분해하면 반응형 연결이 끊기기 때문에 state와 getters는 `storeToRefs`로 감싸야 하고, actions는 그냥 꺼내도 된다.

사례연구 authStore는 토큰과 사용자 정보를 스토어에 담고 localStorage로 새로고침을 견딘다. Navigation Guard가 이 스토어를 불러 접근 권한을 검사한다. Code Challenge(p211)에서는 `src/components/practices/library/StoreCounter.vue`에 스캐폴딩 `counter.js`의 state, getters, actions를 화면으로 붙였다.

따로 만든 것은 `src/components/practices/pinia/` 아래 네 종이다. Option 스타일 스토어, Setup 스타일 스토어, `storeToRefs` 비교, 부모 자식이 아닌 두 컴포넌트의 스토어 공유. `storeToRefs` 실습은 끊긴 값과 살아 있는 값을 나란히 두고 버튼을 누르는데, 구조분해한 쪽만 0에서 멈춘다.

#### 과제 5: Weather Store (p212)

`src/stores/configStore.js`와 `src/views/exercise/ex5/` 아래 화면 세 개

단위 하나를 스토어로 올린 과제다. `configStore`는 단위를 담는다. state는 `unit`이고 초기값은 celsius다. getter `unitSymbol`은 현재 단위에 맞는 기호를 내주고, action `toggleUnit`이 섭씨와 화씨를 오간다. 화면 쪽에서는 `UnitToggler.vue`가 현재 단위를 보여주고 바꾸는 버튼이 되어 Navigation Bar 옆에 붙었다.

메인과 상세 양쪽에 단위 설정을 적용했다. 원본 데이터는 섭씨 숫자로 두고 화씨일 때만 `Math.round((rawTemp * 9) / 5 + 32)`로 변환해 보여준다. 소개 화면에서 단위를 바꾸고 대시보드로 넘어가도 바뀐 단위가 그대로 붙어 있다.

개인 추가

- 요구사항 4번을 추가 스토어 쪽으로 풀었다. `weatherStore.js`가 도시 배열과 검색어, 선택 상태를 state로 쥐고 검색 결과와 평균 기온, 즐겨찾기 수를 getters로 내준다
- `averageTemp`는 다른 getter인 `filteredList`를 참조해야 해서 화살표 함수 대신 일반 함수로 적었다
- `StoreStatusBar.vue`는 props를 하나도 받지 않고 스토어에서 선택 상태를 직접 꺼낸다. 과제 3에서 부모를 거쳐 내려보내던 것과 대비된다
- `WeatherSummary.vue`에 단위 기호 prop을 기본값과 함께 붙였다. 넘기지 않으면 섭씨로 나와 앞 과제 화면은 그대로다

#### 문법 실습 (p213-228)

통신 단원은 HTTP와 REST API에서 출발했다. 클라이언트가 요청을 보내고 서버가 응답하며, 메서드는 데이터베이스 CRUD와 맞물린다. 주소는 명사로만 짓고 행위는 메서드로 대신한다.

Fetch는 설치가 필요 없다. 대신 JSON 변환과 에러 처리를 손으로 해야 한다. Axios는 설치가 필요한 대신 둘 다 자동이고 baseURL과 인터셉터를 지원한다. 설치는 `npm install axios`다.

`axios.get`, `post`, `put`, `patch`, `delete`는 각각 조회와 생성, 전체 수정, 일부 수정, 삭제를 맡고 전부 Promise를 반환한다. 비동기 호출 방식은 `.then` 체이닝과 `async`/`await` 두 갈래가 있는데, await 쪽은 위에서 아래로 읽히고 에러는 try catch로 잡는다.

#### Code Challenge: Axios (p229)

`src/components/practices/library/` 아래 두 파일

- `AxiosWeather.vue`는 Open Weather를 `await axios.get`으로 호출한다. `isLoading`으로 버튼을 잠그고 try catch finally로 성공과 실패, 뒷정리를 나눴다
- `AxiosJson.vue`는 JSONPlaceholder로 GET, POST, PUT, DELETE를 한 화면에서 돌린다. Mount 시점에 GET으로 세 건만 읽어 온다

가상 API라 POST와 PUT의 응답은 정상으로 오지만 서버 데이터가 실제로 바뀌지는 않는다. 그래서 응답 객체를 화면 목록에 직접 반영했다.

교재는 통신 실패를 `alert()`으로 알리지만 화면 안 문구로 바꿨다. 경고창은 눌러서 닫기 전까지 다른 동작을 막는다. API 키도 코드에 박지 않고 `.env.local`의 `VITE_OPENWEATHER_API_KEY`에서 읽게 했다. 저장소가 공개라 키가 그대로 올라가면 안 된다.

최종본 반영

- 최종본도 대시보드와 서비스 소개, 도시 상세 세 경로로 나누고 `WeatherSubNav.vue`를 붙였다
- 상태는 `finalWeatherStore.js`가 쥐고 `storeToRefs`로 꺼내 쓴다. 단위 전환은 과제 5와 같은 `configStore`를 공유한다
- 모듈로 두던 `src/data/finalWeatherList.js`는 스토어가 대신해서 지웠다
- 도시 목록 데이터는 과제 4 스냅샷과 따로 둔다. 스냅샷과 누적본이 서로의 즐겨찾기를 건드리지 않는다

#### 과제 6: Weather Axios (p230)

`src/api/weatherApi.js`와 `src/stores/liveWeatherStore.js`, `src/views/exercise/ex6/` 아래 화면 세 개

Mock Data를 걷어내고 OpenWeatherMap에서 실제 관측값을 받아 온다. 도시 여섯 곳의 좌표는 `src/data/cityCoords.js`에 적어 뒀다. `axios.create`로 baseURL과 공통 파라미터를 인스턴스에 걸어 두면 호출부는 경로와 좌표만 넘기면 된다. 여섯 도시는 `axios.all`로 한꺼번에 요청하는데, 하나씩 기다리면 그만큼 느려지기 때문이다.

스토어가 `isLoading`과 `errorMessage`를 함께 들고 있어 화면은 불러오는 중과 실패를 나눠 그린다. 받아 온 목록은 스토어에 남겨 둬서 상세로 갔다 돌아와도 다시 요청하지 않는다.

개인 추가

- 요구사항 2번은 같은 OpenWeatherMap의 Air Pollution API로 풀었다. 상세 화면에 대기질 지수와 미세먼지 두 종을 붙였다
- 요구사항 3번은 Open-Meteo로 풀었다. 키가 필요 없는 외부 API고 사흘치 최고 최저 기온을 준다
- 상세 화면이 필요한 두 요청도 `axios.all`로 함께 보낸다

#### 문법 실습 (p232-245)

UI 라이브러리는 Button과 Input, Dialog 같은 공통 부품을 컴포넌트 단위로 묶어 둔 패키지다. CSS와 마크업을 직접 짜지 않아도 되고 반응형과 접근성이 미리 들어 있다. Vue 3 생태계에서는 PrimeVue와 Vuetify의 점유율이 높은데, 국내에서는 Element Plus를 많이 쓴다. 학습 난이도도 Element Plus가 가장 낮다.

설치는 `npm install element-plus`로 하고, `main.js`에서 모듈과 CSS를 import한 뒤 `app.use(ElementPlus)`로 올린다. 컴포넌트 갈래는 다섯이다. 화면 뼈대를 잡는 Basic, 입력과 검증을 맡는 Form, 표와 리스트를 그리는 Data, 경로 이동을 맡는 Navigation, 알림과 로딩을 띄우는 Feedback.

#### Code Challenge: Element Plus (p246-248)

`src/components/practices/library/` 아래 세 파일

- `ElementForm.vue`는 회원가입 폼이다. 이메일 형식과 약관 동의를 차례로 검사하고 `ElMessage`의 error, warning, success로 결과를 알린다
- `ElementCommerce.vue`는 `el-input-number`로 구매 수량을, `el-rate`로 별점을 받는다. 두 값은 요약 줄에 실시간으로 반영된다
- `ElementFeedback.vue`는 `ElMessageBox.confirm`으로 삭제 확인창을 띄우고 `el-progress`로 진행률을 그린다. `setInterval`로 20씩 올리고 100에서 멈춘다

개인 추가

- 타이머를 `onUnmounted`에서 끈다. 화면을 떠나도 계속 도는 것을 막는다
- 교재 메시지에 붙은 이모지는 옮겨 적지 않았다

#### 과제 7: Weather UI Library (p249)

`src/views/exercise/ex7/` 아래 화면 세 개와 Element Plus 부품 두 개

과제 6의 실시간 데이터 화면을 Element Plus로 다시 그렸다. 국내 점유율과 낮은 학습 난이도를 보고 고른 라이브러리다.

- 카드 배치는 `el-row`와 `el-col`의 24분할 그리드로 바꿨다. 화면 폭에 따라 한 줄에 놓이는 카드 수가 달라진다
- 검색창은 `el-input`, 필터는 `el-switch`, 수치는 `el-descriptions`, 날씨 상태는 `el-tag`로 바꿨다
- 불러오는 동안은 `el-skeleton`, 결과가 없으면 `el-empty`가 자리를 채운다. 알림은 `ElMessage`가 맡는다
- 상세 화면의 사흘 예보는 `el-timeline`으로 세로로 늘어놓았다

개인 추가

- 대시보드와 소개를 오가는 줄을 `el-menu`의 router 모드로 바꿔 `ElWeatherSubNav.vue`에 담았다
- 스캐폴딩이 남겨 둔 `main.css`의 2열 그리드를 걷어냈다. `#app`을 반으로 접고 있어서 그리드가 제 폭을 쓰지 못했다

최종본 반영

최종본에도 실시간 데이터와 Element Plus를 함께 얹었다. 화면 구성은 과제 7과 같고 스토어만 따로 둔다. 하드코딩해 두던 도시 배열은 사라졌고, `finalWeatherStore`가 API에서 받아 온 값을 담는다.
