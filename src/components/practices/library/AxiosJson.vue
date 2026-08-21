<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const items = ref([])
const textInput = ref('')
const message = ref('')

const handleRead = async () => {
  try {
    // 공부용으로 딱 3개만 들고 온다
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    console.log('GET 성공:', response.data)
    message.value = 'GET으로 3건을 읽었다.'
  } catch (error) {
    console.error('GET 실패:', error)
    message.value = 'GET 실패'
  }
}

const handleCreate = async () => {
  if (textInput.value === '') {
    message.value = '저장할 텍스트를 입력하세요.'
    return
  }

  try {
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '날씨현황',
      userId: 1,
    })
    console.log('POST 성공:', response.data)
    // 가상 API라 서버에 실제로 쌓이지 않는다. 응답 객체를 목록 앞에 직접 붙인다
    items.value.unshift(response.data)
    textInput.value = ''
    message.value = `POST로 id ${response.data.id}를 받았다.`
  } catch (error) {
    console.error('POST 실패:', error)
    message.value = 'POST 실패'
  }
}

const handleUpdate = async (item) => {
  try {
    const response = await axios.put(`${BASE_URL}/${item.id}`, {
      title: `수정된 ${item.title}`,
      body: '수정현황',
    })
    console.log('PUT 성공:', response.data)
    item.title = response.data.title
    message.value = `PUT으로 id ${item.id}를 교체했다.`
  } catch (error) {
    console.error('PUT 실패:', error)
    message.value = 'PUT 실패'
  }
}

const handleDelete = async (item) => {
  try {
    await axios.delete(`${BASE_URL}/${item.id}`)
    console.log('DELETE 성공:', item.id)
    items.value = items.value.filter((row) => row.id !== item.id)
    message.value = `DELETE로 id ${item.id}를 지웠다.`
  } catch (error) {
    console.error('DELETE 실패:', error)
    message.value = 'DELETE 실패'
  }
}

onMounted(() => {
  handleRead()
})
</script>

<template>
  <div class="practice-section">
    <h2>Axios CRUD 프로토타입 훈련</h2>

    <p>JSONPlaceholder는 가상 API라 응답은 정상으로 오지만 서버 데이터가 실제로 바뀌지는 않는다.</p>

    <div class="create-row">
      <input v-model="textInput" type="text" placeholder="저장할 텍스트를 입력하세요" />
      <button class="post" @click="handleCreate">POST (추가)</button>
      <button @click="handleRead">GET (다시 읽기)</button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>

    <div v-for="item in items" :key="item.id" class="item-row">
      <div class="item-text">
        <small>ID: {{ item.id }}</small>
        <p>{{ item.title }}</p>
      </div>
      <button class="put" @click="handleUpdate(item)">PUT (수정)</button>
      <button class="del" @click="handleDelete(item)">DEL (삭제)</button>
    </div>
  </div>
</template>

<style scoped>
.create-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.create-row input {
  flex: 1;
  padding: 6px 10px;
}

.message {
  color: #42b883;
  font-size: 14px;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.item-text {
  flex: 1;
}

.item-text p {
  margin: 4px 0 0;
}

.item-row button {
  padding: 4px 10px;
  cursor: pointer;
}
</style>
