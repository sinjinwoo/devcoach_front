<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <ChatWindow :messages="messages" />

    <!-- 직무 선택 단계 -->
    <JobSelect v-if="step === 'selectJob'" :jobs="jobList" @select="handleJobSelect" />

    <!-- 자소서 업로드 단계 -->
    <ResumeUpload
      v-else-if="step === 'uploadResume'"
      @submit="handleResumeUpload"
    />


  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatWindow from '@/components/ChatWindow.vue'
import JobSelect from '@/components/JobSelect.vue'
import ResumeUpload from '@/components/ResumeUpload.vue'

const step = ref('selectJob')
const selectedJob = ref(null)
const messages = ref([
  {
    role: 'bot',
    content: `선택하신 공고는 [OOO 기업 - 백엔드 개발자]입니다.\n공고에 나와있는 직무는 다음과 같습니다:\n`,
  },
])
const jobList = ['백엔드 개발', '프론트엔드 개발', '데이터 분석']
const loading = ref(false)

const handleJobSelect = (job) => {
  selectedJob.value = job
  messages.value.push({ role: 'user', content: job })
  messages.value.push({
    role: 'bot',
    content: `선택하신 직무는 ${job}입니다. 자소서 문항과 답변을 업로드해주세요.`,
  })
  step.value = 'uploadResume'
}

const handleResumeUpload = ({ question, answer }) => {
  messages.value.push({ role: 'user', content: `문항: ${question}\n답변: ${answer}` })
  messages.value.push({ role: 'bot', content: `답변을 생성 중입니다...` })
  loading.value = true
  setTimeout(() => {
    messages.value.push({
      role: 'bot',
      content: `첨삭 결과: 핵심 키워드가 누락되어 보입니다. 더 구체적인 경험을 서술해주세요.`,
    })
    messages.value.push({
      role: 'bot',
      content: `다른 문항과 답변을 올려주세요.`,
    })
    step.value = 'uploadResume'
    loading.value = false
  }, 1500)
}

const handleUserMessage = (text) => {
  messages.value.push({ role: 'user', content: text })
  messages.value.push({
    role: 'bot',
    content: `다른 문항과 답변을 업로드해주세요.`,
  })
}
</script>
