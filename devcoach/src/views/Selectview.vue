<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '@/components/Card.vue'
import axios from 'axios' 
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.q)
const searchQuery = ref(route.query.q || '')

const fullResults = ref([
])

const postsToRender = ref([])
const clientPage = ref(1)
const clientPageSize = 2
const hasMore = ref(true)
const isLoading = ref(false)

const renderNextChunk = () => {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true

  setTimeout(() => {
    const start = (clientPage.value - 1) * clientPageSize
    const end = clientPage.value * clientPageSize
    const chunk = fullResults.value.slice(start, end)

    if (chunk.length > 0) {
      postsToRender.value.push(...chunk)
      clientPage.value++
    }

    if (end >= fullResults.value.length) {
      hasMore.value = false
    }

    isLoading.value = false
  }, 300)
}

const handleScroll = () => {
  if (!hasMore.value || isLoading.value) return

  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight

  if (scrollTop + windowHeight >= scrollHeight - 100) {
    renderNextChunk()
  }
}

onMounted(() => {
  axios.get('http://localhost:8000/search',
 {params: {
    company: searchQuery.value
  }}).then(response => {
      fullResults.value = response.data
      if (fullResults.value.length > 0) {
        renderNextChunk()
      } else {
        hasMore.value = false
      }
    })
    .catch(error => {
      console.error('Error fetching posts:', error)
      hasMore.value = false
    })
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="py-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
    <div class="w-full max-w-3xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          v-for="post in postsToRender"
          :key="post.url"
          :post="post"
        />
      </div>
      <div class="text-center mt-[0.5rem] mb-2">
        <template v-if="hasMore">
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center">
              <svg class="w-8 h-8 mb-1 text-blue-500 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
              <span class="ml-2 text-blue-600 text-base font-medium">아래로 스크롤하여 <b>더보기</b></span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center">
              <svg class="w-8 h-8 mb-1 text-gray-400 opacity-60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
              <span class="ml-2 text-gray-500 text-base font-medium">모든 데이터를 불러왔습니다.</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
