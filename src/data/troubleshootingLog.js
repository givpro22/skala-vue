export const troubleshootingDays = [
  {
    day: 1,
    date: '2026-08-18',
    topic: '프로젝트 생성, 반응형 데이터, v-bind',
    note: '커밋과 README에서 막혔던 흔적을 찾지 못했다. 이 날 심긴 문제가 하나 있긴 한데 발견은 4일차라 그쪽에 적었다.',
    items: [],
  },
  {
    day: 2,
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
]
