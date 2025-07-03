<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ChatWindow from '@/components/ChatWindow.vue'
import JobSelect from '@/components/JobSelect.vue'
import ResumeUpload from '@/components/ResumeUpload.vue'
import { useChatStore } from '@/stores/chatStore'

const route = useRoute()
const store = useChatStore()

const company = route.query.companyName || '알 수 없는 회사'
const job = route.query.jobTitle || '직무 없음'
const url = route.query.url

// ⏳ 점 애니메이션 관련 상태
const lodingdots = ref('')
let dotTimer = null

onMounted(() => {
  store.fetchJobDescriptions(company, url, job)

  // lodingdots 애니메이션 시작
  let count = 0
  dotTimer = setInterval(() => {
    count = (count + 1) % 4 // 0 ~ 3
    lodingdots.value = '.'.repeat(count)
  }, 500)
})

onUnmounted(() => {
  // lodingdots 애니메이션 정리
  clearInterval(dotTimer)
})

const handleJobSelect = (job) => {
  store.handleJobSelect(job)
}

const handleResumeUpload = ({ question, answer }) => {
  store.handleResumeUpload({ company, question, answer })
}
</script>

<template>
  <div class="relative min-h-screen flex justify-center items-center">
    <!-- 🔄 채용공고 분석중 스피너 -->
    <div
      v-if="store.jobList.length === 0 && !store.selectedJob"
      class="absolute inset-0 bg-white flex items-center justify-center z-50 flex-col"
    >
      <svg class="w-10 h-10 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span class="mt-4 text-blue-600 text-lg font-semibold">
        채용공고를 분석중입니다{{ lodingdots }}
      </span>
    </div>

    <!-- 💬 챗봇 UI -->
    <div class="max-w-3xl w-full px-4 py-8" v-else>
      <ChatWindow :messages="store.messages" />

      <!-- 직무 선택 -->
      <JobSelect
        v-if="store.step === 'selectJob'"
        :jobs="store.jobList"
        @select="handleJobSelect"
      />

      <!-- 자소서 업로드 -->
      <ResumeUpload
        v-else-if="store.step === 'uploadResume'"
        @submit="handleResumeUpload"
      />

    </div>
  </div>
</template>
