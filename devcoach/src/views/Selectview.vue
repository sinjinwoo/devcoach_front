<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '@/components/Card.vue'
import { useSelectStore } from '@/stores/selectStore'

const route = useRoute()
const store = useSelectStore()

const handleScroll = () => {
  if (store.hasMore && !store.isLoading) {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const scrollHeight = document.documentElement.scrollHeight

    if (scrollTop + windowHeight >= scrollHeight - 100) {
      store.renderNextChunk()
    }
  }
}

onMounted(() => {
  const query = route.query.q || ''
  if (store.fullResults.length > 0 && store.searchQuery === query) {
    store.renderNextChunk()
  } else {
    store.fetchJobList(query)
  }
  console.log(store.fullResults);
  
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="py-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
    <div class="w-full max-w-3xl">

      <!-- ⏳ 로딩 스피너 -->
      <div v-if="store.isLoading" class="py-12 text-center">
        <svg class="w-10 h-10 animate-spin text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p class="mt-2 text-blue-500">불러오는 중입니다...</p>
      </div>

      <!-- ❌ 채용 공고 없음 -->
      <div
        v-else-if="!Array.isArray(store.fullResults) && store.fullResults?.message === 'No recruitment information found.'"
        class="text-center py-12 text-gray-600 text-lg"
      >
        <p class="text-2xl font-semibold">해당 기업의 채용공고가 없습니다.</p>
  <p class="text-lg text-gray-500">검색어를 바꾸어 다시 시도해보세요.</p>

  <div class="flex justify-center space-x-4 mt-4">
    <button 
      class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all font-semibold text-lg"
      @click="$router.push('/search')"
    >
      다시 검색하기
    </button>
    <button
      class="px-8 py-3 border-2 border-blue-400 text-blue-600 rounded-2xl bg-white shadow hover:bg-blue-50 hover:border-blue-600 transition-all font-semibold text-lg"
      @click="$router.push('/help')"
    >
      도움말 보기
    </button>
    </div>
    </div>

      <!-- ✅ 공고 카드 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card
          v-for="post in store.postsToRender"
          :key="post.url"
          :post="post"
        />
      </div>

      <!-- ⬇️ 더보기 or 끝 -->
      <div class="text-center mt-[0.5rem] mb-2" v-if="store.fullResults.length > 0 && store.fullResults[0]?.message !== 'No recruitment information found.'">
        <template v-if="store.hasMore">
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 mb-1 text-blue-500 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span class="ml-2 text-blue-600 text-base font-medium">아래로 스크롤하여 <b>더보기</b></span>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 mb-1 text-gray-400 opacity-60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span class="ml-2 text-gray-500 text-base font-medium">모든 데이터를 불러왔습니다.</span>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>


