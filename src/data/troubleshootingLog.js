export const troubleshootingDays = [
  {
    day: 1,
    label: 'Day 1',
    date: '2026-08-18',
    topic: '프로젝트 생성, 반응형 데이터, v-bind',
    note: '커밋과 README에서 막혔던 흔적을 찾지 못했다. 이 날 심긴 문제가 하나 있긴 한데 발견은 4일차라 그쪽에 적었다.',
    items: [],
  },
  {
    day: 2,
    label: 'Day 2',
    date: '2026-08-19',
    topic: '디렉티브, 이벤트, 폼 바인딩, 과제 1, Composition API',
    note: '',
    items: [
      {
        title: '검색창에 한글을 치면 필터가 따라오지 않는다',
        symptom:
          '과제 1의 도시 검색 입력에 v-model을 걸었더니 한글을 입력하는 동안 목록이 걸러지지 않았다. 조합이 끝나야 그제야 한 번에 반영됐다.',
        cause:
          'v-model은 IME 조합 중에는 값을 갱신하지 않는다. 조합이 확정되기 전까지 바인딩된 값이 그대로 있으니 필터도 돌지 않는다.',
        fix: 'v-model을 :value와 @input으로 분해했다. @input은 조합 중에도 그대로 들어온다.',
        code: '<input :value="searchQuery" @input="updateSearch" />',
        learned:
          '한글 입력이 이상하면 v-model부터 의심한다. 영어로 쳐 보면 멀쩡해서 더 늦게 찾는다.',
        commits: ['09ef547'],
        files: ['src/components/exercise/WeatherMockup.vue'],
        resolved: true,
      },
      {
        title: 'reactive 배열을 통째로 갈아 끼우니 화면이 멈췄다',
        symptom: 'reactive로 만든 배열에 새 배열을 대입했더니 데이터는 바뀌는데 화면이 그대로였다.',
        cause:
          'reactive가 반환하는 것은 원래 객체를 감싼 프록시다. 변수에 다른 배열을 대입하면 그 프록시와의 연결이 끊긴다.',
        fix: '재할당을 걷어내고 push, splice로 원본을 직접 건드렸다.',
        learned:
          'reactive는 안을 고치는 것만 감지한다. 통째로 바꿔야 하면 ref로 두고 .value를 갈아 끼우는 편이 낫다.',
        commits: ['dae5f14'],
        files: ['src/components/practices/composition/ReactiveObject.vue'],
        resolved: true,
      },
      {
        title: 'watch가 이전 값을 현재 값과 똑같이 준다',
        symptom:
          'reactive 객체를 watch로 감시하면서 oldValue와 newValue를 찍었더니 둘이 같은 값으로 나왔다. 가격을 500원 올려도 이전값 자리에 오른 값이 찍혔다.',
        cause:
          'reactive 객체를 통째로 감시하면 deep이 자동으로 붙는다. 이때 oldValue와 newValue가 같은 프록시를 가리켜서 이전 상태가 남지 않는다.',
        fix: '() => state.price처럼 게터로 속성 하나를 조준해 감시했다. 원시값이라 이전 값이 그대로 남는다.',
        learned:
          '이전 값이 필요하면 객체째로 보지 말고 속성을 집는다. 화면 두 개를 나란히 두고 비교하는 실습으로 남겨 뒀다.',
        commits: ['dae5f14'],
        files: [
          'src/components/practices/composition/WatchReactive.vue',
          'src/components/practices/composition/WatchDeep.vue',
        ],
        resolved: true,
      },
    ],
  },
  {
    day: 3,
    label: 'Day 3',
    date: '2026-08-20',
    topic: '과제 2, 컴포넌트 등록과 라이프사이클, Props, Emits, Slot, 과제 3',
    note: '',
    items: [
      {
        title: '컴포넌트를 지웠는데 타이머가 계속 돈다',
        symptom:
          'onMounted에서 setInterval로 3초짜리 카운터를 켰다. 컴포넌트를 화면에서 내려도 콘솔이 계속 찍혔다.',
        cause:
          'setInterval은 컴포넌트와 무관하게 브라우저가 들고 있다. 컴포넌트가 사라져도 아무도 꺼 주지 않는다.',
        fix: 'onUnmounted에서 clearInterval로 껐다. timerId를 컴포넌트 바깥 변수에 담아 뒀다가 쓴다.',
        learned:
          '켠 것은 끄는 자리를 같이 만든다. 4일차 Element Plus 실습에서 el-progress를 setInterval로 올릴 때 같은 자리에 또 걸렸고, 그때는 바로 onUnmounted를 붙였다.',
        commits: ['2ebf882'],
        files: ['src/components/practices/component/LifecycleChild.vue'],
        resolved: true,
      },
      {
        title: 'props의 배열과 객체 기본값',
        symptom:
          '기록이 없다. 남은 것은 그 자리에 붙여 둔 주석 한 줄뿐이라 화면에서 무엇이 보였는지는 모른다.',
        cause:
          '배열과 객체 기본값을 리터럴로 적으면 그 컴포넌트를 쓰는 모든 자리가 같은 객체 하나를 나눠 쓰게 된다.',
        fix: 'default를 함수로 바꿔 호출할 때마다 새 값을 반환하게 했다.',
        code: 'weeklyForecast: { type: Array, default: () => [] }',
        learned: '원시값은 그냥 적고 배열과 객체만 함수로 감싼다.',
        commits: ['d429273'],
        files: ['src/components/practices/component/PropsCard.vue'],
        resolved: true,
      },
    ],
  },
  {
    day: 4,
    label: 'Day 4',
    date: '2026-08-21',
    topic: '과제 4 Router, Pinia, 과제 5, Axios, 과제 6, Element Plus, 과제 7',
    note: '하루에 과제 넷과 단원 셋이 몰린 날이라 항목도 여기 몰려 있다.',
    items: [
      {
        title: '화면을 경로로 나누자 상세가 목록의 상태를 못 본다',
        symptom:
          '과제 3까지는 WeatherParent가 도시 배열을 ref로 쥐고 있었다. 목록과 상세를 각각 라우트로 떼어내니 상세 화면에서 그 배열을 볼 방법이 없었다. 목록에서 켠 즐겨찾기도 상세로 넘어가면 사라졌다.',
        cause:
          '컴포넌트 안에 있던 상태라 화면이 갈리는 순간 같이 갈렸다. 부모 자식 관계가 아니니 props로 내려보낼 수도 없다.',
        fix: '도시 배열을 src/data/weatherList.js에 reactive 배열로 빼고 목록과 상세가 각각 import 했다.',
        learned:
          '화면을 나누기 전에 상태를 어디에 둘지부터 정한다. 이 모듈 방식은 그날 오후 Pinia를 배우면서 스토어로 다시 옮겼다.',
        commits: ['993b286'],
        files: ['src/data/weatherList.js'],
        resolved: true,
      },
      {
        title: '상세에서 옆 도시로 넘어가도 내용이 그대로다',
        symptom:
          '상세 화면에 이전, 다음 도시 router-link를 달았다. 누르면 주소창의 cityId는 바뀌는데 화면에 뜬 도시는 그대로였다.',
        cause:
          '같은 라우트 안에서 파라미터만 바뀌면 vue-router가 컴포넌트를 재사용한다. 다시 만들어지지 않으니 onMounted도 다시 돌지 않는다.',
        fix: 'route.params.cityId를 watch로 감시해서 바뀔 때마다 도시를 다시 골랐다.',
        learned:
          'onMounted에 넣은 초기화는 라우트가 바뀔 때 다시 돈다는 보장이 없다. 파라미터로 내용이 갈리는 화면이면 watch를 같이 건다.',
        commits: ['59da593'],
        files: ['src/views/lessons/exercise/ex4/WeatherDetailView.vue'],
        resolved: true,
      },
      {
        title: '스토어를 구조분해했더니 값이 0에서 멈췄다',
        symptom:
          '스토어에서 state를 구조분해로 꺼내 화면에 뿌렸다. 버튼을 눌러 action을 부르면 스토어 값은 오르는데 화면 숫자는 0 그대로였다.',
        cause: '구조분해는 그 순간의 값만 복사해 온다. ref 껍데기가 벗겨져서 반응형 연결이 끊긴다.',
        fix: 'storeToRefs로 감싸 꺼냈다. action은 함수라 그냥 구조분해해도 된다.',
        code: 'const { count } = storeToRefs(store)',
        learned:
          'state와 getters는 storeToRefs, actions는 그냥. 끊긴 쪽과 살아 있는 쪽을 한 화면에 나란히 놓고 버튼을 눌러 보는 실습으로 남겼다.',
        commits: ['231b4f2'],
        files: ['src/components/practices/pinia/PiniaStoreToRefs.vue'],
        resolved: true,
      },
      {
        title: 'getter 안에서 다른 getter가 안 잡힌다',
        symptom: '평균 기온 getter가 검색 결과 getter를 받아 쓰게 만들었는데 값이 나오지 않았다.',
        cause: '화살표 함수로 적은 getter에서는 this가 스토어를 가리키지 않는다.',
        fix: 'averageTemp만 일반 함수로 바꿔 this.filteredList를 읽게 했다. 다른 getter를 참조하지 않는 것들은 화살표 함수 그대로 뒀다.',
        code: 'averageTemp() {\n  const list = this.filteredList\n  ...\n}',
        learned: 'Option 스타일 스토어에서 getter끼리 엮이면 화살표 함수를 쓸 수 없다.',
        commits: ['231b4f2'],
        files: ['src/stores/weatherStore.js'],
        resolved: true,
      },
      {
        title: '과제 4와 5를 다 만들고 나서 요구사항을 다시 읽었다',
        symptom:
          '과제 4를 목록과 상세 두 화면으로 만들고 경로를 /exercise/4/:id로 잡았다. 과제 5는 부모가 쥐던 상태를 통째로 스토어로 옮기는 걸로 풀었다. 둘 다 교재가 요구한 것과 달랐다. 과제 4는 서비스 소개 화면이 빠져 있었고 파라미터 이름도 달랐다. 과제 5가 요구한 것은 도시 상태가 아니라 단위 설정 스토어였다.',
        cause: '요구사항을 끝까지 읽지 않고 앞부분만 보고 시작했다.',
        fix: '경로를 /exercise/4/weather/:cityId로 다시 잡고 소개 화면을 더해 세 화면으로 짰다. 과제 5는 configStore를 새로 만들어 단위 전환을 붙였다. 먼저 만들어 둔 weatherStore 쪽은 지우지 않고 개인 추가로 남겼다.',
        learned:
          '요구사항을 다 읽고 화면 개수와 경로 모양부터 적어 둔 다음 시작한다. 두 커밋 사이가 네 시간이다.',
        commits: ['993b286', '59da593'],
        files: ['src/router/index.js', 'src/stores/configStore.js'],
        resolved: true,
      },
      {
        title: 'POST와 PUT은 성공하는데 서버 데이터가 안 바뀐다',
        symptom:
          'JSONPlaceholder로 POST와 PUT을 보내면 응답이 정상으로 왔다. 그런데 다시 GET으로 읽으면 방금 보낸 것이 없었다.',
        cause:
          '연습용 가상 API다. 요청을 받아 그럴듯한 응답만 만들어 주고 실제로 저장하지는 않는다.',
        fix: '응답으로 돌아온 객체를 화면 목록 앞에 직접 붙였다. 서버를 다시 부르지 않는다.',
        learned:
          '통신이 실패한 게 아니라 원래 그런 API였다. 남의 API를 쓸 때는 문서에 적힌 동작부터 확인한다.',
        commits: ['59da593'],
        files: ['src/components/practices/library/AxiosJson.vue'],
        resolved: true,
      },
      {
        title: '모든 화면이 폭의 절반만 쓰고 있었다',
        symptom:
          '과제 7에서 카드를 el-row와 el-col의 24분할 그리드로 바꿨다. 화면을 넓혀도 카드가 왼쪽 절반 안에서만 늘어나고 오른쪽은 계속 비어 있었다.',
        cause:
          '스캐폴딩이 만들어 둔 main.css에 @media (min-width: 1024px) 블록이 있었다. 거기서 #app을 grid-template-columns: 1fr 1fr로 잡고 있었다. 1일차에 App.vue 안쪽만 비우고 이 CSS는 그대로 뒀다.',
        fix: '해당 미디어 쿼리 블록을 통째로 지웠다. 같이 붙어 있던 a 태그 hover 스타일도 안 쓰는 것이라 걷어냈다.',
        learned:
          'Element Plus 그리드를 넣기 전까지는 화면이 원래 그 폭인 줄 알았다. 스캐폴딩이 남긴 전역 CSS는 처음에 한 번 열어 보고 안 쓸 것은 그때 지운다. 심긴 것은 1일차, 찾은 것은 4일차다.',
        commits: ['0445d07', 'df2891c'],
        files: ['src/assets/main.css'],
        resolved: true,
      },
      {
        title: '상세로 넘어가면 상단 색인 강조가 꺼진다',
        symptom:
          '과제 4 대시보드에서는 상단 색인에 강조가 붙는데 도시 카드를 눌러 상세로 넘어가면 풀린다. 어느 화면을 보고 있는지 색인만 봐서는 알 수 없다.',
        cause:
          'vue-router의 active 판정은 주소 문자열 앞부분을 비교하는 게 아니라 현재 라우트의 matched 배열에 그 링크의 라우트 레코드가 들어 있는지를 본다. 대시보드와 상세를 중첩이 아니라 형제 라우트로 등록해서, 상세 경로의 matched에는 대시보드 레코드가 아예 없다.',
        fix: '강의가 끝난 뒤 저장소를 포트폴리오로 묶으면서 고쳤다. App.vue에서 router-link-active를 걷어내고 주소 앞부분으로 직접 판정해 가장 길게 걸리는 항목 하나만 켠다. 라우트를 children으로 다시 묶는 쪽은 부모 화면에 router-view를 심어야 해서 고르지 않았다.',
        learned:
          'active 클래스가 기대대로 안 붙으면 경로 문자열이 아니라 라우트를 어떻게 등록했는지를 본다.',
        commits: ['993b286', '59da593'],
        files: ['src/App.vue', 'src/router/index.js'],
        resolved: true,
      },
      {
        title: '상세 경로에서는 하위 색인 두 링크가 다 꺼진다',
        symptom:
          '과제 4 대시보드에서는 하위 색인의 날씨 대시보드에 강조가 붙는다. 상세로 넘어가면 날씨 대시보드와 서비스 소개가 둘 다 아무 표시가 없다. 상단 색인 쪽을 고친 뒤에도 여기는 그대로다.',
        cause:
          '위 항목과 원인이 겹치는데 하나가 더 붙는다. WeatherSubNav는 router-link-exact-active를 쓴다. exact는 matched의 마지막 레코드까지 같고 파라미터도 같아야 켜진다. 상세 경로에서 대시보드 링크는 형제 라우트라 matched에 없고, 들어 있더라도 exact 조건에서 걸린다.',
        fix: '안 고쳤다. WeatherSubNav는 과제 4에서 만들어 과제 5, 6, 7과 최종본이 같이 쓴다. 제출한 스냅샷이라 뒤에서 손대지 않는 쪽을 골랐다. 고치려면 exact를 떼고 상단 색인처럼 직접 판정해야 하는데 그러면 과제 4부터 7까지 화면이 전부 같이 바뀐다.',
        learned:
          '같은 원인이라도 exact 판정을 쓰면 부모 경로 링크는 파라미터가 붙는 순간 무조건 꺼진다. 공용 컴포넌트를 과제 여러 개가 나눠 쓰면 한 줄 고치는 것도 제출본 여러 개를 건드리는 일이 된다.',
        commits: ['59da593'],
        files: ['src/components/exercise/WeatherSubNav.vue'],
        resolved: false,
      },
    ],
  },
  {
    day: 'extra',
    label: '강의 후 정리',
    date: '2026-08-22',
    topic: '메인홈 스피어 사진, 메인홈과 최종본 스토어 합치기, API 키 설정',
    note: '강의 일정이 끝난 뒤 저장소를 포트폴리오로 묶으면서 겪은 것들이다. 강의를 들으며 막힌 게 아니라서 Day 5로 세우지 않고 따로 뒀다. 아직 커밋하지 않은 작업 구간이라 커밋 해시 자리가 비어 있다.',
    items: [
      {
        title: '도시 카드 사진이 그 도시와 아무 상관이 없었다',
        symptom:
          '스피어 카드와 최종본 목록이 heroCities의 photo를 그대로 띄운다. 그런데 어느 카드에도 그 도시로 보이는 사진이 없었다. 서울 카드에 서울이 아닌 곳이 떠 있었다.',
        cause:
          'photo가 https://picsum.photos/seed/${id}/300/300이었다. picsum은 씨앗값으로 아무 사진이나 돌려주는 자리채움 서비스다. 씨앗이 도시 id라 카드마다 사진이 고정되긴 하는데 그 사진이 그 도시일 이유는 없다. 스피어를 만들 때 자리채움이라고 주석에 적어 두고 그대로 잊었다.',
        fix: '위키백과 API로 도시별 사진을 뽑아 URL을 박았다. 처음에는 도시 문서(서울특별시, 광주광역시 같은 것)의 대표 이미지를 썼는데 광주, 대전, 울산, 포항, 여수, 창원은 지도 그림이 나오고 대구, 목포, 통영은 사진 여러 장을 이어 붙인 콜라주가 나왔다. 행정구역 문서의 대표 이미지가 사진이라는 보장이 없다. 명소 문서(무등산, 팔공산, 유달산)로 갈아타서 스무 곳을 다시 뽑았다. 대전은 한밭수목원 사진이 커먼즈가 아니라 한국어 위키 로컬 업로드라 비자유 저작물일 수 있어서 커먼즈에 있는 장태산으로 한 번 더 바꿨다.',
        learned:
          '자리채움을 넣을 때는 주석 말고 다시 볼 곳에 적어 둔다. 코드 옆 주석은 그 파일을 다시 열 일이 없으면 안 보인다. 위키 이미지는 URL이 /wikipedia/commons/인지 본다. /wikipedia/ko/면 그 언어판에만 올라온 파일이라 재사용 조건이 다르다.',
        commits: [],
        files: ['src/data/heroCities.js'],
        resolved: true,
      },
      {
        title: '도시 사진이 한 장도 안 뜨는데 콘솔은 깨끗했다',
        symptom:
          '사진 주소를 위키미디어 것으로 갈아 끼웠더니 스피어 카드가 전부 빈 채로 돌았다. 에러가 한 줄도 안 찍혀서 CORS나 CSP 쪽을 한참 뒤졌다.',
        cause:
          '두 가지가 겹쳤다. 하나는 주소다. 위키미디어는 썸네일을 아무 폭으로나 만들어 주지 않고 정해 둔 크기만 내준다. 처음에 960px로 스무 장을 확인해 전부 200을 받아 놓고, 카드에 쓰기엔 과하다 싶어 480px로 낮춘 뒤 다시 확인하지 않았다. 480은 그 목록에 없어서 스무 장이 한꺼번에 400으로 떨어졌다. 응답 본문에 쓸 수 있는 크기를 보라고 적혀 있었는데 응답을 열어 볼 생각을 못 했다. 직접 재 보니 120, 250, 500, 960, 1280은 200이고 400, 480, 640, 800은 400이다. 다른 하나는 콘솔이 조용했던 이유다. TextureLoader의 load는 네 번째 인자로 실패 콜백을 받는데 안 넘기면 실패를 그냥 삼킨다.',
        fix: '주소 스무 개를 480px에서 500px로 바꾸고 전부 200이 오는 것을 다시 확인했다. loadSprites에 실패 콜백을 붙여 다음에는 같은 식으로 숨지 않게 했다. README에 적어 둔 폭도 같이 고쳤다.',
        code: "loader.load(city.photo, cropToSquare, undefined, () => {\n  console.error('도시 사진 로드 실패:', city.name, city.photo)\n})",
        learned:
          '값을 바꿨으면 바꾼 값으로 다시 확인한다. 한 번 통과한 확인은 그 값에 대한 것이지 그 코드에 대한 것이 아니다. 화면이 비었는데 콘솔이 깨끗하면 아무 일도 안 일어난 게 아니라 아무도 말을 안 하는 것일 수 있다. 조용히 실패하는 로더는 콜백을 붙여 말하게 만든다.',
        commits: [],
        files: ['src/data/heroCities.js', 'src/components/home/SphereHero.vue'],
        resolved: true,
      },
      {
        title: '사진이 옆으로 늘어나 보인다',
        symptom:
          '위키 사진으로 갈아 끼우자 스피어 카드의 사진이 가로로 퍼져 보였다. picsum은 정사각을 돌려줘서 이 문제가 없었다.',
        cause:
          '스프라이트 카드는 CARD_SIZE 1.7짜리 정사각인데 위키 사진은 4:3, 3:2로 제각각이다. 스프라이트 재질은 텍스처를 면에 꽉 채우고 원본 비율을 봐 주지 않는다.',
        fix: '텍스처를 입힐 때 repeat과 offset으로 긴 쪽을 잘라 내고 가운데 정사각만 쓰게 했다. 캔버스에 다시 그려서 자르는 방법도 있는데 그러면 사진 스무 장을 전부 한 번 더 그려야 한다.',
        code: 'texture.repeat.set(height / width, 1)\ntexture.offset.set((1 - height / width) / 2, 0)',
        learned: '이미지를 손대기 전에 텍스처 옵션부터 본다. 잘라 쓰는 기능이 재질 쪽에 이미 있다.',
        commits: [],
        files: ['src/components/home/SphereHero.vue'],
        resolved: true,
      },
      {
        title: '메인홈을 먼저 열면 최종본 목록이 덜 찬 채로 멈춘다',
        symptom:
          '메인홈을 지나 최종본 목록으로 들어가면 도시가 몇 곳만 있고 더 늘지 않았다. 받아 온 시각도 계속 비어 있었다. 최종본 주소를 새로 열면 멀쩡했다. 처음에는 두 화면이 따로 논다고만 느꼈다.',
        cause:
          '메인홈이 기온만 담는 전용 스토어를 따로 쥐고 있어서 최종본 스토어로 합쳤다. 합치고 나니 적재 함수가 둘이 됐다. 메인홈은 loadStream으로 스무 건을 한꺼번에 띄우고 도착 순으로 채우고, 최종본은 loadAll로 axios.all에 묶어 한 번에 받았다. 그런데 loadStream이 requested를 켜 두면 최종본 onMounted의 if (!live.requested) live.loadAll()이 통째로 건너뛰어진다. 그래서 최종본은 스트림으로 들어온 만큼만 보이고 loadedAt이 영영 비어 있었다.',
        fix: '두 화면이 loadStream 하나를 부르게 합쳤다. loadAll은 다시 불러오기 버튼 전용으로 남겼다.',
        learned:
          '중복 요청을 막는 깃발을 진입점 여럿이 나눠 쓰면 한쪽이 켠 깃발이 다른 쪽의 초기화를 막는다. 증상이 데이터가 아니라 화면 흐름으로 보여서 원인을 늦게 찾았다. 화면 하나만 열어 보면 재현되지 않는다.',
        commits: [],
        files: [
          'src/stores/finalWeatherStore.js',
          'src/views/lessons/final/WeatherHomeView.vue',
          'src/components/home/SphereHero.vue',
        ],
        resolved: true,
      },
      {
        title: '다시 불러오기를 누르면 즐겨찾기가 다 꺼진다',
        symptom: '최종본 목록에서 즐겨찾기를 몇 개 켜 두고 다시 불러오기를 누르면 전부 꺼졌다.',
        cause:
          'loadAll이 this.cityList = results로 목록을 통째로 갈아 끼운다. 새로 만든 항목에는 fetchCurrentWeather가 favorite: false를 새로 달아 준다. 즐겨찾기는 서버가 모르는 값이라 응답에 들어 있을 수가 없다.',
        fix: '갈아 끼우기 전에 켜 둔 것만 id로 빼 놨다가 새 목록에 되붙였다.',
        code: 'favorite: favorites[weather.id] === true',
        learned:
          '서버가 모르는 값을 목록 항목에 얹어 뒀으면 목록을 갈아 끼울 때 그 값도 같이 날아간다.',
        commits: [],
        files: ['src/stores/finalWeatherStore.js'],
        resolved: true,
      },
      {
        title: '.gitignore에 .env가 빠져 있었다',
        symptom: 'API 키를 .env에 넣고 나서 무시 목록을 확인했더니 .env가 없었다.',
        cause:
          '스캐폴딩이 넣어 준 *.local이 .env.local은 걸러 준다. 확장자가 붙지 않은 .env는 그 패턴에 안 걸린다. 그동안 키를 .env.local에 뒀어서 몰랐다.',
        fix: '.env와 .env.*를 넣고 !.env.example로 예제만 예외로 뺐다. git log --all -- .env로 지금까지 올라간 적이 없는 것도 같이 확인했다.',
        learned:
          '무시되고 있을 거라고 짐작한 파일은 한 번 확인한다. 이미 올라간 뒤라면 무시 목록에 넣어도 늦다.',
        commits: [],
        files: ['.gitignore'],
        resolved: true,
      },
      {
        title: '새로 발급한 OpenWeather 키가 401을 돌려준다',
        symptom: '키를 .env에 넣었는데도 메인홈과 최종본이 전부 빈 채로 뜨고 콘솔에 401이 찍혔다.',
        cause:
          '처음에는 .env 문법을 의심했다. 등호 옆에 공백을 두고 값을 따옴표로 감싸 뒀기 때문이다. Vite의 loadEnv로 찍어 보니 32자 키가 그대로 파싱되고 있었다. 키를 API에 직접 던져 봐도 401이라 읽는 쪽이 아니라 키 자체가 아직 활성화 전이었다. OpenWeather 신규 키는 발급하고 나서 쓸 수 있게 되기까지 시간이 걸린다.',
        fix: '기다리니 풀렸다. 코드는 한 줄도 안 고쳤다. 얼마쯤 지나 같은 키를 그대로 다시 던져 보니 200이 왔고 스무 곳을 전부 정상으로 받는다. 확인하는 김에 .env는 dev 서버가 뜰 때 한 번만 읽힌다는 것도 알았다. 값을 고쳤으면 서버를 껐다 켜야 반영된다.',
        learned:
          '키가 안 먹으면 코드가 키를 제대로 읽는지와 키 자체가 살아 있는지를 나눠서 본다. 둘을 섞어서 보면 계속 코드만 고치게 된다.',
        commits: [],
        files: ['.env.example', 'src/api/weatherApi.js'],
        resolved: true,
      },
    ],
  },
]
