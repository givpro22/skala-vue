# skala-vue

SKALA Vue.js 실습 과제. 4반 박영서

## 실행

```
npm install
npm run dev
```

http://localhost:5173

Node는 20.19 이상이나 22.12 이상이 필요하다. `package.json`의 engines에 적어 뒀다. 배포용으로 묶을 때는 `npm run build`, 묶은 결과를 로컬에서 열어 볼 때는 `npm run preview`를 쓴다.

## 실행에 필요한 키

메인홈과 최종본, 과제 6과 7, Axios 실습은 OpenWeatherMap 키가 있어야 돈다. `.env.example`을 복사해 `.env.local`을 만들고 본인 키를 넣는다.

```
cp .env.example .env.local
```

```
VITE_OPENWEATHER_API_KEY=발급받은_키
```

`.env`와 `.env.`로 시작하는 파일은 gitignore 대상이고 `.env.example`만 예외로 올라간다. 저장소가 공개라 키가 그대로 올라가면 안 된다.

여기서 두 번 헤맸다. 하나는 새로 발급받은 키가 바로 듣지 않는다는 것이다. 활성화까지 시간이 걸려서 그 사이에는 401이 돌아온다. 키를 잘못 붙여 넣은 줄 알고 한참 들여다봤다. 다른 하나는 dev 서버가 뜰 때 환경 변수를 한 번만 읽는다는 것이다. 서버를 켜 둔 채로 키를 고치면 화면은 그대로다. 껐다 켜야 반영된다.

## 폴더 구조

```
src/
├── main.js
├── App.vue
├── api/weatherApi.js       OpenWeatherMap, Open-Meteo 호출
├── router/index.js
├── data/                   도시 목록, 트러블슈팅 기록
├── stores/                 Pinia 스토어
├── assets/                 공통 CSS
├── components/
│   ├── home/               메인홈 히어로와 3D 스피어
│   ├── exercise/           과제 화면이 나눠 쓰는 자식 컴포넌트
│   ├── practices/          단원별 문법 실습
│   └── icons/
└── views/
    ├── MainHomeView.vue
    ├── TroubleshootingView.vue
    ├── NotFoundView.vue
    └── lessons/
        ├── LessonsView.vue
        ├── practice/       문법 실습 화면
        ├── exercise/       과제 스냅샷. 과제 4부터는 ex4에서 ex7까지 하위 폴더
        └── final/          누적본
```

## 구성

화면은 셋으로 갈린다. 메인홈, 실습 아카이브, 트러블슈팅이다. 첫 화면만 미리 싣고 나머지는 지연 로딩으로 걸어 뒀다.

- `/` — 메인홈
- `/lessons` — 실습 아카이브 목록. Day 1부터 4까지 문법 실습과 과제로 들어가는 색인이다
- `/troubleshooting` — 막혔던 자리와 푼 방법을 날짜별로 모은 곳
- 어디에도 걸리지 않는 주소는 `NotFoundView.vue`가 받는다

아카이브 아래로는 Day 번호를 프리픽스로 두고 깊어진다. 주소만 봐도 지금 몇 일차의 무엇을 보는지 안다.

- `/lessons/final`, `/lessons/final/about`, `/lessons/final/weather/:cityId` — 누적본
- `/lessons/day2/exercise-1`, `/lessons/day3/exercise-2`, `/lessons/day3/exercise-3` — 과제 1, 2, 3
- `/lessons/day4/exercise-4`부터 `exercise-7`까지 — 과제 4에서 7. 각각 `/about`과 `/weather/:cityId`를 함께 둔다
- `/lessons/day1/practice/basic`을 비롯한 아홉 단원 — 문법 실습

각 화면의 역할은 이렇다.

- `src/views/lessons/final/` — 그때까지 배운 것을 모두 반영한 누적본. 새 단원이 끝날 때마다 여기를 고친다
- `src/views/lessons/exercise/` — 과제 1, 2, 3이 바로 아래에 있고 과제 4부터는 `ex4`에서 `ex7`까지로 나뉜다. 제출한 그대로 둔 스냅샷이라 뒤 단원 문법을 섞지 않는다
- `src/views/lessons/practice/` — 문법 실습이 단원별로 나뉘고 `PracticeNav.vue`가 그 색인을 그린다
- 자식 컴포넌트(`BaseDashboardCard`, `SearchBar`, `WeatherCard`, `WeatherSummary`, `WeatherSubNav`)는 누적본과 과제들이 함께 쓴다

도시 목록은 두 벌이다. 과제 화면은 `src/data/cityCoords.js`의 여섯 곳을 보고, 메인홈과 최종본은 `src/data/heroCities.js`의 스무 곳을 본다. 나눠 둔 이유는 메인홈에서 도시를 늘려도 이미 제출한 과제 화면의 내용이 바뀌면 안 되기 때문이다. 누적본은 새 내용을 반영하는 자리라 스무 곳 쪽에 붙였다. 스무 곳 쪽에는 좌표 말고 사진 주소와 사진에 찍힌 명소 이름도 함께 들어 있다.

## 메인홈

`/`는 도시 사진 카드가 3D 구 위에서 도는 화면이다. 카드 한 장이 도시 하나다. 사진 위에 지금 기온이 얹히고 카드를 누르면 그 도시 상세로 넘어간다.

들어오면 카드가 평면 링으로 깔렸다가 중앙으로 빨려 들어간 뒤 구로 퍼진다. 그다음부터는 천천히 돈다. 잡고 끌면 끈 만큼 돌아가고, 손을 떼면 관성으로 잦아들다가 제 속도로 돌아온다. 위아래로 기울이는 각도에는 상한을 걸어 뒀다. 처음에는 31도에서 끊었는데 그러니 세로로는 거의 안 도는 것처럼 느껴져서 69도까지 열었다. 90도까지 열지 않은 것은 그 각도가 구의 극을 정면으로 보는 자리여서다. 조금만 더 가면 북극이 화면 아래로 내려가 위아래가 뒤집힌다. 가만히 둘 때 얹히는 흔들림은 기운 만큼 진폭이 줄어서 둘을 더해도 69도를 넘지 않는다.

처음에는 마우스를 올려 둔 방향으로 회전이 가감속되게 만들었다. 커서를 가만히 둬도 화면이 계속 흔들려서 카드를 겨냥하기 어려웠다. 끌어서 돌리는 쪽으로 바꾸고 나니 원하는 카드를 원하는 자리에 세울 수 있다. 대신 끌다 손을 뗀 것과 카드를 누른 것을 갈라야 해서 누른 지점에서 5픽셀 안쪽으로 끝났을 때만 클릭으로 친다.

카드 사진은 처음에 picsum.photos에서 랜덤으로 받았다. 도시 이름과 사진이 아무 상관이 없어서 서울 카드에 낯선 숲 사진이 붙는 식이었다. 지금은 위키미디어 커먼즈에 올라온 그 지역 명소 사진을 500px 썸네일로 가져다 쓰고 도시마다 `place` 필드를 둬서 사진 밑에 찍힌 곳 이름이 붙는다. 서울은 경복궁 광화문, 부산은 해운대, 제주는 성산일출봉이다.

원래는 도시 문서의 대표 이미지를 쓰려고 했는데 쓸 수 없는 것이 많았다. 광주, 대전, 울산, 포항, 여수, 창원은 대표 이미지가 지도 그림이고 대구, 목포, 통영은 여러 장을 이어 붙인 콜라주다. 카드에 올려 보니 무엇을 찍은 사진인지 알 수 없어서 명소 문서 쪽으로 갈아탔다. 대전은 그렇게 고른 사진이 커먼즈가 아니라 한국어 위키에 직접 올라간 파일이라 비자유 저작물일 수 있어 장태산으로 한 번 더 바꿨다.

사진은 가로세로 비율이 제각각인데 스프라이트는 정사각이다. 그냥 붙이면 세로로 긴 사진이 옆으로 늘어난다. 텍스처의 `repeat`과 `offset`으로 긴 쪽을 잘라 내고 가운데 정사각만 쓴다.

기온은 스무 곳을 한꺼번에 띄우는데, 다 올 때까지 기다리지 않고 사진과 도시명으로 먼저 그린 뒤 도착하는 대로 채운다. 메인홈과 최종본은 같은 스토어를 본다. 따로 뒀다가 같은 스무 곳을 두 번씩 받아 오는 것을 보고 합쳤는데, 합치고 나서 한 번 더 걸렸다. 메인홈은 `loadStream`을 부르고 최종본은 `loadAll`을 불렀던 탓이다. `loadStream`이 `requested`를 켜 두면 최종본의 `onMounted`가 `loadAll`을 건너뛴다. 그래서 최종본 목록에는 스트림으로 들어온 만큼만 남고 받아 온 시각도 빈 채였다. 지금은 두 화면이 `loadStream` 하나를 부른다. `loadAll`은 다시 불러오기 버튼 전용으로 남겼고 목록을 통째로 갈아 끼울 때 켜 둔 즐겨찾기가 날아가던 것도 같이 고쳤다.

두 화면이 너무 따로 놀아서 이어 붙인 것도 있다. 최종본 카드와 상세 화면이 스피어와 같은 사진을 쓰고 메인홈에는 같은 스토어를 읽는 요약 줄을 붙였다. 도착한 도시 수와 평균 기온, 가장 더운 곳, 받아 온 시각이 거기 뜬다. 숫자가 한 출처에서 나오니 구에서 본 값과 목록에서 본 값이 어긋나지 않는다. 서로를 가리키는 링크도 넣어서 구에서 목록으로, 목록에서 구로 오갈 수 있다.

3D 스피어는 Three.js로 만들었다. 강의에서 다루지 않은 라이브러리라 AI 도움을 받았다.

## 화면 테마

상단 색인 오른쪽에 시스템, 라이트, 다크 세 버튼을 뒀다. 시스템은 브라우저 설정을 그대로 따라가고 쓰는 도중에 설정을 바꿔도 화면이 같이 바뀐다. 직접 고른 값은 localStorage에 남아서 다음에 들어와도 유지된다.

색은 `src/assets/base.css` 한 곳에서만 정하고 화면 파일은 거기 이름을 가져다 쓴다. 처음에는 스캐폴딩이 넣어 둔 `prefers-color-scheme` 블록만 살아 있어서 브라우저가 다크면 배경만 검어지고 카드는 흰색 그대로였다. 화면마다 색을 직접 박아 둔 탓이다.

`index.html`에 짧은 스크립트를 하나 넣어 앱이 뜨기 전에 테마를 먼저 건다. 이게 없으면 저장해 둔 값과 브라우저 설정이 어긋날 때 첫 프레임에 반대 색이 한 번 번쩍인다. Element Plus는 자기 색을 `html.dark`에서 찾기 때문에 스토어가 그 클래스도 같이 토글한다.

## 트러블슈팅

`/troubleshooting`은 강의를 들으며 막혔던 자리와 푼 방법을 Day별로 모은 곳이다. 데이터는 `src/data/troubleshootingLog.js`에 있다.

커밋 히스토리와 코드에 남은 주석에서 확인한 것만 적었다. 흔적을 찾지 못한 날은 비워 뒀고 아직 못 고친 것도 그대로 뒀다. 본문에 적힌 주소는 그날 쓰던 것이라 지금 아카이브 주소와 다를 수 있다.

## 실습 내용

강의는 실습을 열 단원으로 나눠 두고 다시 기본 문법과 확장 문법 두 갈래로 묶어 본다. 1에서 4까지와 9가 기본 문법 쪽이고, Router와 Pinia, Axios, UI 라이브러리처럼 밖에서 가져다 붙이는 5에서 8까지와 정적 서버에 올리는 10이 확장 문법 쪽이다.

교재를 따라가며 문법을 익힌 화면은 `practice/`에 두고 그 단원의 제출 과제는 `exercise/`에 낸 그대로 둔다. 누적본 `final/`만 새 단원이 끝날 때마다 고쳤다. 단원마다 남는 것은 이 셋이다.

디렉티브는 첫날에 시작해 둘째 날에 끝났고 넷째 날 하루에는 단원 다섯 개가 지나갔다. 일차와 단원이 딱 맞물리지는 않는다. 아카이브 주소는 일차로 나눠 뒀으니 헤딩 옆 괄호를 보면 된다. 1일차가 2026년 8월 18일, 4일차가 21일이다.

### 단원 1. Vue.js 시작하기 (1일차)

Vite 기반 Vue 3로 프로젝트를 생성하면서 Router와 Pinia, ESLint, Prettier를 함께 넣었다(p48-56). 그다음 index.html에서 main.js로, main.js에서 App.vue로 이어지는 진입 경로를 따라가며 구조를 확인했고(p58-62), 기본 스캐폴딩 화면은 비운 뒤 실습 컴포넌트를 갈아 끼우는 구조로 App.vue를 교체했다(p68-69). 실습 파일은 `src/components/practices/` 아래로 분류해 뒀다.

스캐폴딩에 `vite-plugin-vue-devtools`가 딸려 와서 `npm run dev`로 띄우면 Vue Devtools 패널이 같이 붙는다. 컴포넌트 트리와 반응형 값이 그대로 보여서 화면이 안 바뀔 때 여기부터 열어 보는 버릇이 붙었다. 파일을 저장하는 순간 새로고침 없이 바뀐 자리만 갈리는 것도 이때 처음 봤다.

### 단원 2. Vue 문법 (1~2일차)

#### 문법 실습 (p70-115)

값이 화면에 실리는 방식부터 봤다. `SampleOne.vue`에서 일반 변수와 `ref()` 변수를 각각 버튼으로 증가시켜 보면서 화면 갱신 차이를 비교한 것이 반응형 데이터 실습이고(p70), `SampleTwo.vue`에서는 텍스트 보간법 안에 JavaScript 표현식을 넣어 출력했다(p71).

디렉티브는 v-html과 v-text를 먼저 붙였다. v-html이 문자열을 HTML로 해석해 주입하는 탓에 XSS 노출까지 확인하고 v-text, 보간법과 결과를 비교했다(p74-76). v-bind는 href, src, disabled 동적 바인딩에 클래스 바인딩, 스타일 바인딩까지 이어졌다(p77-81).

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

### 단원 3. Composition API (2~3일차)

#### 문법 실습 (p117-144)

`<script setup>`에 데이터와 로직을 모아 쓰는 Composition API로 넘어왔다. `createApp()`이 맡는 전역 등록 역할도 확인했다(p117-120).

상태를 만드는 방법은 둘이다. ref는 원시값과 배열, 객체를 감싸 반응형으로 만들고 스크립트에서는 `.value`로 접근한다(p121-122). reactive는 객체와 배열 전용 반응형인데, 통째로 재할당하면 반응성이 끊겨 push, splice로 다뤘다(p123-124). 두 실습 파일은 p126 Code Challenge에 있다.

값을 지켜보는 쪽은 computed와 watch, watchEffect다. computed는 의존 데이터가 바뀔 때만 재계산되는 캐싱 동작을 일반 함수와 비교했다(p127-129). watch는 단일 변수 하나만 감시하다가 배열로 묶어 다중 소스까지 감시했고(p130-133), watch deep은 `deep: true`로 객체 전체를 감시하면서 특정 속성을 조준해야 이전 값이 보존되는 차이도 확인했다(p134-139). watchEffect는 대상 지정 없이 내부에서 접근한 반응형 데이터를 자동 추적한다. 최초 1회는 즉시 실행된다(p141-142). computed, watch 실습 6종 파일은 p144 Code Challenge에서 확인했다.

#### 과제 2: Weather Composition (p145)

`src/components/exercise/WeatherComposition.vue`

검색어와 선택 도시 정보, 날씨 배열을 반응형 상태로 정의하는 데서 시작했다. `computed`로는 검색어가 도시 이름에 포함된 항목만 걸러 `filteredWeatherList`를 구성했고, `watch`로는 선택 도시 문구 변화를 감시해 이전값과 새값을 콘솔에 찍었다. `watchEffect` 쪽은 검색어 입력을 자동 추적해 콘솔에 기록한다. 검색어가 비면 전체를 출력하고, 일치 항목이 없으면 안내 문구를 표시한다.

개인 추가

- 25도 이상만 보기 체크박스를 반응형 상태로 추가하고 검색어와 함께 필터에 반영
- 표시 중인 도시의 평균 기온을 computed로 계산
- 즐겨찾기 개수는 computed로 계산하고 그 값의 변화는 watch로 감시

### 단원 4. Vue Component (3일차)

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

### 단원 5. Vue Router (4일차)

쌓아 두던 화면을 전부 경로로 떼어내는 일 자체가 실습이어서 과제와 하나로 붙었다. 이 단원은 따로 실습 화면을 남기지 않았다.

#### 과제 4: Weather Router (p196)

`src/views/lessons/exercise/ex4/` 아래 화면 세 개와 `src/router/index.js`

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

### 단원 6. Pinia (4일차)

#### 문법 실습 (p197-211)

스토어를 처음 붙인 단원이다. 소규모 데이터 전달은 provide/inject로 가볍게 하고, 앱 전체에서 얽히고 디버깅이 중요한 데이터는 스토어로 관리한다는 것이 Pinia와 provide/inject를 가르는 기준이었다.

Store는 state와 getters, actions로 이뤄진다. state는 반응형 데이터, getters는 읽기 전용 계산 값, actions는 상태를 바꾸거나 통신하는 함수다. 구축은 `main.js`에 `createPinia()` 등록, `stores/` 아래 스토어 파일 생성, 컴포넌트에서 import해 인스턴스를 가동하는 3단계로 밟았다. 스토어 함수명은 use와 파일명과 Store를 붙여 짓는다.

Frequent Mistakes에서 짚은 것은 구조분해다. 스토어를 그냥 구조분해하면 반응형 연결이 끊기기 때문에 state와 getters는 `storeToRefs`로 감싸야 하고, actions는 그냥 꺼내도 된다.

사례연구 authStore는 토큰과 사용자 정보를 스토어에 담고 localStorage로 새로고침을 견딘다. Navigation Guard가 이 스토어를 불러 접근 권한을 검사한다. Code Challenge(p211)에서는 `src/components/practices/library/StoreCounter.vue`에 스캐폴딩 `counter.js`의 state, getters, actions를 화면으로 붙였다.

따로 만든 것은 `src/components/practices/pinia/` 아래 네 종이다. Option 스타일 스토어, Setup 스타일 스토어, `storeToRefs` 비교, 부모 자식이 아닌 두 컴포넌트의 스토어 공유. `storeToRefs` 실습은 끊긴 값과 살아 있는 값을 나란히 두고 버튼을 누르는데, 구조분해한 쪽만 0에서 멈춘다.

#### 과제 5: Weather Store (p212)

`src/stores/configStore.js`와 `src/views/lessons/exercise/ex5/` 아래 화면 세 개

단위 하나를 스토어로 올린 과제다. `configStore`는 단위를 담는다. state는 `unit`이고 초기값은 celsius다. getter `unitSymbol`은 현재 단위에 맞는 기호를 내주고, action `toggleUnit`이 섭씨와 화씨를 오간다. 화면 쪽에서는 `UnitToggler.vue`가 현재 단위를 보여주고 바꾸는 버튼이 되어 Navigation Bar 옆에 붙었다.

메인과 상세 양쪽에 단위 설정을 적용했다. 원본 데이터는 섭씨 숫자로 두고 화씨일 때만 `Math.round((rawTemp * 9) / 5 + 32)`로 변환해 보여준다. 소개 화면에서 단위를 바꾸고 대시보드로 넘어가도 바뀐 단위가 그대로 붙어 있다.

개인 추가

- 요구사항 4번을 추가 스토어 쪽으로 풀었다. `weatherStore.js`가 도시 배열과 검색어, 선택 상태를 state로 쥐고 검색 결과와 평균 기온, 즐겨찾기 수를 getters로 내준다
- `averageTemp`는 다른 getter인 `filteredList`를 참조해야 해서 화살표 함수 대신 일반 함수로 적었다
- `StoreStatusBar.vue`는 props를 하나도 받지 않고 스토어에서 선택 상태를 직접 꺼낸다. 과제 3에서 부모를 거쳐 내려보내던 것과 대비된다
- `WeatherSummary.vue`에 단위 기호 prop을 기본값과 함께 붙였다. 넘기지 않으면 섭씨로 나와 앞 과제 화면은 그대로다

#### 최종본 반영

- 최종본도 대시보드와 서비스 소개, 도시 상세 세 경로로 나누고 `WeatherSubNav.vue`를 붙였다
- 상태는 `finalWeatherStore.js`가 쥐고 `storeToRefs`로 꺼내 쓴다. 단위 전환은 과제 5와 같은 `configStore`를 공유한다
- 모듈로 두던 `src/data/finalWeatherList.js`는 스토어가 대신해서 지웠다
- 도시 목록 데이터는 과제 4 스냅샷과 따로 둔다. 스냅샷과 누적본이 서로의 즐겨찾기를 건드리지 않는다

### 단원 7. Axios (4일차)

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

#### 과제 6: Weather Axios (p230)

`src/api/weatherApi.js`와 `src/stores/liveWeatherStore.js`, `src/views/lessons/exercise/ex6/` 아래 화면 세 개

Mock Data를 걷어내고 OpenWeatherMap에서 실제 관측값을 받아 온다. 도시 여섯 곳의 좌표는 `src/data/cityCoords.js`에 적어 뒀다. `axios.create`로 baseURL과 공통 파라미터를 인스턴스에 걸어 두면 호출부는 경로와 좌표만 넘기면 된다. 여섯 도시는 `axios.all`로 한꺼번에 요청하는데, 하나씩 기다리면 그만큼 느려지기 때문이다.

스토어가 `isLoading`과 `errorMessage`를 함께 들고 있어 화면은 불러오는 중과 실패를 나눠 그린다. 받아 온 목록은 스토어에 남겨 둬서 상세로 갔다 돌아와도 다시 요청하지 않는다.

개인 추가

- 요구사항 2번은 같은 OpenWeatherMap의 Air Pollution API로 풀었다. 상세 화면에 대기질 지수와 미세먼지 두 종을 붙였다
- 요구사항 3번은 Open-Meteo로 풀었다. 키가 필요 없는 외부 API고 사흘치 최고 최저 기온을 준다
- 상세 화면이 필요한 두 요청도 `axios.all`로 함께 보낸다

### 단원 8. UI 라이브러리 (4일차)

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

`src/views/lessons/exercise/ex7/` 아래 화면 세 개와 Element Plus 부품 두 개

과제 6의 실시간 데이터 화면을 Element Plus로 다시 그렸다. 국내 점유율과 낮은 학습 난이도를 보고 고른 라이브러리다.

- 카드 배치는 `el-row`와 `el-col`의 24분할 그리드로 바꿨다. 화면 폭에 따라 한 줄에 놓이는 카드 수가 달라진다
- 검색창은 `el-input`, 필터는 `el-switch`, 수치는 `el-descriptions`, 날씨 상태는 `el-tag`로 바꿨다
- 불러오는 동안은 `el-skeleton`, 결과가 없으면 `el-empty`가 자리를 채운다. 알림은 `ElMessage`가 맡는다
- 상세 화면의 사흘 예보는 `el-timeline`으로 세로로 늘어놓았다

개인 추가

- 대시보드와 소개를 오가는 줄을 `el-menu`의 router 모드로 바꿔 `ElWeatherSubNav.vue`에 담았다
- 스캐폴딩이 남겨 둔 `main.css`의 2열 그리드를 걷어냈다. `#app`을 반으로 접고 있어서 그리드가 제 폭을 쓰지 못했다

#### 최종본 반영

최종본에도 실시간 데이터와 Element Plus를 함께 얹었다. 화면 구성은 과제 7과 같고 스토어만 따로 둔다. 하드코딩해 두던 도시 배열은 사라졌고, `finalWeatherStore`가 API에서 받아 온 값을 담는다.

### 단원 9. Modern JavaScript

외부 라이브러리로 과제를 더 늘리는 단원인데, 늘릴 만한 것을 앞에서 이미 다 써 버려서 여기 몫으로 새로 만든 화면은 없다. 검색과 필터, 즐겨찾기는 과제 1부터 조금씩 쌓았다. 대기질과 사흘 예보는 과제 6에서, Element Plus는 과제 7에서 들어갔다.

도시를 여섯 곳에서 스무 곳으로 늘리고 도시마다 명소 사진과 그 장소 이름을 붙였다. 최종본이 과제 7 위에 더한 것은 이 데이터 쪽이다. 그 목록을 메인홈 스피어와 같은 스토어에서 읽으니, 구에 뜬 기온과 목록에 뜬 기온이 어긋나지 않는다.

### 단원 10. 빌드와 배포

`npm run build`로 묶으면 `dist/`가 나오고 `npm run preview`로 그 결과를 로컬에서 열어 볼 수 있다. 여기까지는 별일이 없었는데, 정적 서버에 그대로 올리면 `/`만 열리고 `/lessons/day4/exercise-7` 같은 하위 경로는 404가 났다. 라우터가 `createWebHistory`라 주소는 진짜 경로처럼 생겼지만 서버에는 그 경로에 놓인 파일이 없다. 링크를 눌러 들어갈 때는 라우터가 처리하니 멀쩡해도, 새로고침을 하거나 주소를 직접 치면 서버가 먼저 찾으러 가서 없다고 답한다.

`vercel.json`에 모든 요청을 `index.html`로 넘기는 rewrite 한 줄을 뒀다. 어느 주소로 들어와도 앱이 먼저 뜨고 그다음은 라우터가 받으니, 없는 주소를 `NotFoundView.vue`가 처리하는 것도 그대로다.

로컬 `.env.local`은 올라가지 않으니, Vercel 프로젝트 설정의 Environment Variables에 `VITE_OPENWEATHER_API_KEY`를 넣고 다시 빌드해야 배포본에서 날씨가 뜬다. 키는 빌드하는 시점에 코드 안으로 들어가기 때문이다. 이걸 빠뜨리면 화면은 그려지는데 기온 자리가 전부 빈다.

배포 주소는 올린 뒤 여기 적는다.
