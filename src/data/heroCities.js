// 메인홈 스피어 전용 도시 목록. 과제 화면이 보는 cityCoords와 분리해 둔다.
// 여기를 늘려도 이미 제출한 과제 화면의 도시 수는 그대로다.
// photo는 지금 placeholder다. 실제 사진이 생기면 이 필드만 갈아 끼운다.
const photoOf = (id) => `https://picsum.photos/seed/${id}/300/300`

export const heroCities = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978, photo: photoOf('city_01') },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286, photo: photoOf('city_02') },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756, photo: photoOf('city_03') },
  { id: 'city_04', name: '광주', lat: 35.1595, lon: 126.8526, photo: photoOf('city_04') },
  { id: 'city_05', name: '강릉', lat: 37.7519, lon: 128.8761, photo: photoOf('city_05') },
  { id: 'city_06', name: '제주', lat: 33.4996, lon: 126.5312, photo: photoOf('city_06') },
  { id: 'city_07', name: '인천', lat: 37.4563, lon: 126.7052, photo: photoOf('city_07') },
  { id: 'city_08', name: '대전', lat: 36.3504, lon: 127.3845, photo: photoOf('city_08') },
  { id: 'city_09', name: '대구', lat: 35.8714, lon: 128.6014, photo: photoOf('city_09') },
  { id: 'city_10', name: '울산', lat: 35.5384, lon: 129.3114, photo: photoOf('city_10') },
  { id: 'city_11', name: '청주', lat: 36.6424, lon: 127.489, photo: photoOf('city_11') },
  { id: 'city_12', name: '춘천', lat: 37.8813, lon: 127.73, photo: photoOf('city_12') },
  { id: 'city_13', name: '전주', lat: 35.8242, lon: 127.148, photo: photoOf('city_13') },
  { id: 'city_14', name: '포항', lat: 36.019, lon: 129.3435, photo: photoOf('city_14') },
  { id: 'city_15', name: '여수', lat: 34.7604, lon: 127.6622, photo: photoOf('city_15') },
  { id: 'city_16', name: '목포', lat: 34.8118, lon: 126.3922, photo: photoOf('city_16') },
  { id: 'city_17', name: '안동', lat: 36.5684, lon: 128.7294, photo: photoOf('city_17') },
  { id: 'city_18', name: '속초', lat: 38.207, lon: 128.5918, photo: photoOf('city_18') },
  { id: 'city_19', name: '통영', lat: 34.8544, lon: 128.4331, photo: photoOf('city_19') },
  { id: 'city_20', name: '창원', lat: 35.228, lon: 128.6811, photo: photoOf('city_20') },
]
