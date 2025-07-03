<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
    <!-- 상단 꾸밈: 로고와 슬로건 -->
    <div class="w-full flex flex-col items-center mb-10 z-20">
      <h1 class="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">DevCoach</h1>
      <p class="text-lg text-gray-600 font-medium">당신의 커리어를 위한 기업 탐색, 지금 시작하세요!</p>
    </div>

    <!-- 배경 블러 원 -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-blue-200 opacity-30 rounded-full filter blur-3xl z-0"></div>
    <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 opacity-20 rounded-full filter blur-2xl z-0"></div>

    <!-- 검색 박스 -->
    <div class="w-3/4 flex justify-center z-10">
      <div class="flex items-center w-full max-w-2xl border border-blue-300 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-5 transition-all duration-300 hover:shadow-2xl">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="기업명을 입력하세요"
          class="flex-1 bg-transparent outline-none text-lg px-2 placeholder-gray-400"
        />
        <button class="ml-3 p-2 rounded-full bg-blue-100 hover:bg-blue-300 transition" @click="handleSearch">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="#2563eb" stroke-width="2"/>
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectStore } from '@/stores/selectStore' // ✅ store 가져오기

const searchQuery = ref('')
const router = useRouter()
const selectStore = useSelectStore()

const handleSearch = () => {
  if (!searchQuery.value.trim()) return

  selectStore.reset()

  router.push({ name: 'select', query: { q: searchQuery.value } })
}
</script>
