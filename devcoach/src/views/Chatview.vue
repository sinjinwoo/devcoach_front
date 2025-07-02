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
import { ref,onMounted } from 'vue'
import ChatWindow from '@/components/ChatWindow.vue'
import JobSelect from '@/components/JobSelect.vue'
import ResumeUpload from '@/components/ResumeUpload.vue'
import {useRoute} from 'vue-router'
import axios from 'axios'

const qualifications = ref('')
const requirements = ref('')
const duties = ref('')
const preferred = ref('')

const route = useRoute()
const step = ref('selectJob')
const selectedJob = ref(null)

const company = route.query.companyName || '알 수 없는 회사'
const job = route.query.jobTitle || '직무 없음'
const url = route.query.url

const messages = ref([
  {
    role: 'bot',
    content: `선택하신 공고는 [${company} - ${job}]입니다.\n공고에 나와있는 직무는 다음과 같습니다:\n`,
  }
])

const jobDetailsList = ref([])
const jobList = ref([])
const loading = ref(false)

onMounted(async () => {
  try {
    const res = await axios.post('/api/jobdescription', {
      company,
      url
    })
    console.log(res.data);
    
    jobList.value = res.data.map(item => item.직무명) // 직무명만 추출
    jobDetailsList.value = res.data // 전체 직무 정보 저장

  } catch (err) {
    console.error('직무 정보를 불러오는 데 실패했습니다:', err)
    jobList.value = ['직무 정보를 불러올 수 없음']
  }
})

const handleJobSelect = (job) => {
  selectedJob.value = job
  messages.value.push({ role: 'user', content: job })
  messages.value.push({
    role: 'bot',
    content: `선택하신 직무는 ${job}입니다. 자소서 문항과 답변을 업로드해주세요.`,
  })
  step.value = 'uploadResume'
}

const handleResumeUpload = async ({ question, answer }) => {
  messages.value.push({ role: 'user', content: `문항: ${question}\n답변: ${answer}` })
  messages.value.push({ role: 'bot', content: `답변을 생성 중입니다...` })
  loading.value = true

  // ✅ 선택된 직무 정보 찾기
  const detail = jobDetailsList.value.find(j => j.직무명 === selectedJob.value)

  try {
    const res = await axios.post('/api/assistant', {
      company,
      position: selectedJob.value,
      qualifications: (detail?.자격요건 || []).join('\n'),
      requirements: (detail?.필수사항 || []).join('\n'),
      duties: (detail?.담당업무 || []).join('\n'),
      preferred: (detail?.우대사항 || []).join('\n'),
    })

    messages.value.push({
      role: 'bot',
      content: `첨삭 결과: ${res.data.reply}`
    })
    messages.value.push({
      role: 'bot',
      content: `다른 문항과 답변을 올려주세요.`
    })

  } catch (err) {
    console.error('첨삭 실패:', err)
    messages.value.push({
      role: 'bot',
      content: `❌ 첨삭에 실패했습니다. 다시 시도해주세요.`
    })
  } finally {
    step.value = 'uploadResume'
    loading.value = false
  }
}

const handleUserMessage = (text) => {
  messages.value.push({ role: 'user', content: text })
  messages.value.push({
    role: 'bot',
    content: `다른 문항과 답변을 업로드해주세요.`,
  })
}
</script>
