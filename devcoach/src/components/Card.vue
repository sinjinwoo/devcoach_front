<template>
  <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
    
    <!-- 상단: 회사명 및 채용정보 -->
    <div class="flex-1">
      <div class="flex items-center mb-4">
        <div>
          <h2 class="text-xl font-extrabold text-gray-800">{{ post.name }}</h2>
          <p class="text-blue-600 font-semibold break-words">{{ post.job }}</p>
        </div>
      </div>

      <!-- 상세 정보 -->
      <div class="space-y-1 mb-4 text-gray-600 text-sm">
        <div class="flex items-center"><span class="mr-2">📍</span>{{ post.place }}</div>
        <div class="flex items-center"><span class="mr-2">🧑‍💼</span>{{ post.career }}</div>
        <div class="flex items-center"><span class="mr-2">🎓</span>{{ post.education }}</div>
      </div>
    </div>

    <!-- 하단 버튼 영역: 항상 아래에 고정됨 -->
    <div class="flex gap-2 mt-2">
      <a
        :href="post.url"
        target="_blank"
        class="flex-1 text-center text-white bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-500 transition"
      >
        상세보기
      </a>
      <button
        type="button"
        class="flex-1 text-center text-white bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-500 transition"
        @click=" handleCardClick(post) "
        >
        자소서 첨삭하기
      </button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'

const router = useRouter()
const chatStore = useChatStore()

defineProps({
  post: Object
})

const handleCardClick = (post) => {
  chatStore.reset() // ✅ 상태 초기화
  router.push({
    name: 'chat',
    query: {
      companyName: post.name,
      jobTitle: post.job,
      url: post.url
    }
  })
}
</script>

