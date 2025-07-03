import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useChatStore = defineStore('chatStore', () => {
  const step = ref('selectJob')
  const selectedJob = ref(null)
  const jobList = ref([])
  const jobDetailsList = ref([])
  const messages = ref([])
  const loading = ref(false)

  const fetchJobDescriptions = async (company, url, jobTitle) => {
    try {
      const res = await axios.post('http://localhost:8000/jobdescription', {
        company,
        url
      })
      jobList.value = res.data.reply.map(item => item.직무명)
      jobDetailsList.value = res.data.reply
      messages.value.push({
        role: 'bot',
        content: `선택하신 공고는 [${company} - ${jobTitle}]입니다.`
      })
      messages.value.push({
        role: 'bot',
        content: `해당 공고의 직무 목록을 불러왔습니다. 어떤 직무를 지원하실건가요?`
      })
      step.value = 'selectJob'
    } catch (err) {
      console.error('직무 불러오기 실패:', err)
      jobList.value = ['직무 정보를 불러올 수 없음']
    }
  }

  const handleJobSelect = (job) => {
    selectedJob.value = job
    messages.value.push({ role: 'user', content: job })
    messages.value.push({ role: 'bot', content: `선택하신 직무는 ${job}입니다. 자기소개서를 작성해주세요.` })
    step.value = 'uploadResume'
  }

  const handleResumeUpload = async ({ company, question, answer }) => {
    const detail = jobDetailsList.value.find(j => j.직무명 === selectedJob.value)
    messages.value.push({ role: 'user', content: `문항: ${question}\n답변: ${answer}` })
    messages.value.push({ role: 'bot', content: ' ' })
    loading.value = true
    try {
      const res = await axios.post('http://localhost:8000/assistant', {
        company,
        position: selectedJob.value,
        qualifications: (detail?.자격요건 || []).join('\n'),
        requirements: (detail?.필수사항 || []).join('\n'),
        duties: (detail?.담당업무 || []).join('\n'),
        preferred: (detail?.우대사항 || []).join('\n'),
        ideal: (detail?.인재상 || []).join('\n'),
        question,
        answer,
      })
      const dots= messages.value.pop() // 마지막 봇 메시지 제거

      messages.value.push({ role: 'bot', content: `첨삭 결과: ${res.data.reply.assistant_reply}` })
    } catch (err) {
      console.error('첨삭 실패:', err)
      const dots= messages.value.pop()
      messages.value.push({ role: 'bot', content: '❌ 첨삭에 실패했습니다.' })
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    step.value = 'selectJob'
    selectedJob.value = null
    jobList.value = []
    jobDetailsList.value = []
    messages.value = []
    loading.value = false
  }

  return {
    step,
    selectedJob,
    jobList,
    jobDetailsList,
    messages,
    loading,
    fetchJobDescriptions,
    handleJobSelect,
    handleResumeUpload,
    reset,
  }
}, {
  persist: {
    key: 'chat-store',
    storage: sessionStorage,
    paths: ['selectedJob', 'messages','step']
  }
})