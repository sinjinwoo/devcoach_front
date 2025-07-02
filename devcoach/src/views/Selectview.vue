<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '@/components/Card.vue'

const fullResults = ref([
  {
    name: '(주)지아이티',
    job: '현대자동차그룹지아이티전장사업팀 스마트팩토리 파트 (완성차) 경력 채용',
    url: 'https://www.saramin.co.kr/zf_user/jobs/relay/view?view_type=list&rec_idx=51144928',
    place: '서울 송파구 외',
    career: '경력 5년↑ · 인턴직',
    education: '대학교(4년)↑'
  },
  {
    name: '(주)지아이티',
    job: '현대자동차그룹 (주)지아이티6월 경력 채용',
    url: 'https://www.saramin.co.kr/zf_user/jobs/relay/view?view_type=list&rec_idx=51078702',
    place: '서울 송파구 외',
    career: '경력 3년↑ · 인턴직',
    education: '대학교(4년)↑'
  },
  {
    name: '㈜지아이티아카데미 대전',
    job: '[그린컴퓨터아트학원] 웹퍼블리셔  & 프론트엔드 강의 강사 모집',
    url: 'https://www.saramin.co.kr/zf_user/jobs/relay/view?view_type=list&rec_idx=51041805',
    place: '대전 서구',
    career: '경력무관 · 파트 외',
    education: '대학(2,3년)↑'
  },
  {
    name: '(주)지아이티아카데미 대구',
    job: '[그린컴퓨터아트학원 대구캠퍼스] 정보보안 분야 강사 모집',
    url: 'https://www.saramin.co.kr/zf_user/jobs/relay/view?view_type=list&rec_idx=51024767',
    place: '대구 중구',
    career: '경력 3년↑ · 정규직 외',
    education: '학력무관'
  }
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
  renderNextChunk()
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
