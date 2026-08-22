export const troubleshootingDays = [
  {
    day: 1,
    label: 'Day 1',
    date: '2026-08-18',
    topic: '프로젝트 생성, 반응형 데이터, v-bind',
    note: '커밋과 README에서 막혔던 흔적을 찾지 못했다.',
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
    ],
  },
  {
    day: 4,
    label: 'Day 4',
    date: '2026-08-21',
    topic: '과제 4 Router, Pinia, 과제 5, Axios, 과제 6, Element Plus, 과제 7',
    note: '하루에 과제 넷과 단원 셋이 지나간 날이다.',
    items: [
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
    ],
  },
  {
    day: 'extra',
    label: '강의 후 정리',
    date: '2026-08-22',
    topic: '메인홈 스피어 사진, 메인홈과 최종본 스토어 합치기, API 키 설정',
    note: '강의 일정이 끝난 뒤 저장소를 포트폴리오로 묶으면서 겪은 것들이다. 강의를 들으며 막힌 게 아니라서 Day 5로 세우지 않고 따로 뒀다.',
    items: [
      {
        title: '사진이 안 뜨거나 옆으로 늘어났다',
        symptom:
          '사진 주소를 위키미디어 것으로 갈아 끼우면서 두 가지에 걸렸다. 하나는 스피어 카드가 전부 빈 채로 도는 것이다. 에러가 한 줄도 안 찍혀서 CORS나 CSP 쪽을 한참 뒤졌다. 다른 하나는 사진이 가로로 퍼져 보이는 것이다. picsum은 정사각을 돌려줘서 없던 문제다.',
        cause:
          '안 뜬 데는 두 가지가 겹쳤다. 하나는 주소다. 위키미디어는 썸네일을 아무 폭으로나 만들어 주지 않고 정해 둔 크기만 내준다. 처음에 960px로 스무 장을 확인해 전부 200을 받아 놓고, 카드에 쓰기엔 과하다 싶어 480px로 낮춘 뒤 다시 확인하지 않았다. 480은 그 목록에 없어서 스무 장이 한꺼번에 400으로 떨어졌다. 응답 본문에 쓸 수 있는 크기를 보라고 적혀 있었는데 응답을 열어 볼 생각을 못 했다. 직접 재 보니 120, 250, 500, 960, 1280은 200이고 400, 480, 640, 800은 400이다. 다른 하나는 콘솔이 조용했던 이유다. TextureLoader의 load는 네 번째 인자로 실패 콜백을 받는데 안 넘기면 실패를 그냥 삼킨다. 늘어난 쪽은 원인이 따로다. 스프라이트 카드는 CARD_SIZE 1.7짜리 정사각인데 위키 사진은 4:3, 3:2로 제각각이고, 스프라이트 재질은 텍스처를 면에 꽉 채우면서 원본 비율을 봐 주지 않는다.',
        fix: '주소 스무 개를 480px에서 500px로 바꾸고 전부 200이 오는 것을 다시 확인했다. loadSprites에 실패 콜백을 붙여 다음에는 같은 식으로 숨지 않게 했다. README에 적어 둔 폭도 같이 고쳤다. 비율은 텍스처를 입힐 때 repeat과 offset으로 긴 쪽을 잘라 내고 가운데 정사각만 쓰게 했다. 캔버스에 다시 그려서 자르는 방법도 있는데 그러면 사진 스무 장을 전부 한 번 더 그려야 한다.',
        code: "loader.load(city.photo, cropToSquare, undefined, () => {\n  console.error('도시 사진 로드 실패:', city.name, city.photo)\n})\n\ntexture.repeat.set(height / width, 1)\ntexture.offset.set((1 - height / width) / 2, 0)",
        learned:
          '값을 바꿨으면 바꾼 값으로 다시 확인한다. 한 번 통과한 확인은 그 값에 대한 것이지 그 코드에 대한 것이 아니다. 화면이 비었는데 콘솔이 깨끗하면 아무 일도 안 일어난 게 아니라 아무도 말을 안 하는 것일 수 있다. 조용히 실패하는 로더는 콜백을 붙여 말하게 만든다. 비율 쪽은 이미지를 손대기 전에 텍스처 옵션부터 봤으면 됐다. 잘라 쓰는 기능이 재질에 이미 있다.',
        commits: ['d52a5cc'],
        files: ['src/data/heroCities.js', 'src/components/home/SphereHero.vue'],
        resolved: true,
      },
    ],
  },
]
