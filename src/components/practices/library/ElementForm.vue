<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('가입 신청이 정상적으로 완료되었습니다.')
}
</script>

<template>
  <el-card class="practice-card">
    <template #header>실습 1. 회원가입 Form과 인풋 제어</template>

    <div class="form-row">
      <span class="label">이메일 주소:</span>
      <el-input v-model="userForm.email" placeholder="example@email.com" clearable />
    </div>

    <div class="form-row">
      <el-switch v-model="userForm.agree" />
      <span>개인정보 수집 및 필수 이용약관에 동의합니다.</span>
    </div>

    <el-button type="success" class="submit" @click="handleRegister">회원가입하기</el-button>
  </el-card>
</template>

<style scoped>
.practice-card {
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.form-row .label {
  white-space: nowrap;
}

.submit {
  width: 100%;
}
</style>
