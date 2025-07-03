import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'
import axios from 'axios'

export const useSelectStore = defineStore('selectStore', () => {
  const searchQuery = ref('')
  const fullResults = ref([])
  const postsToRender = ref([])
  const clientPage = ref(1)
  const clientPageSize = 2
  const hasMore = ref(true)
  const isLoading = ref(false)
  const isPaging = ref(false)

  const fetchJobList = async (query) => {
    searchQuery.value = query
    isLoading.value = true
    try {
      const res = await axios.get(' /api/search', {
        params: { company: query }
      })

      fullResults.value = res.data
      postsToRender.value = []
      clientPage.value = 1
      hasMore.value = true

      if (Array.isArray(res.data) && res.data.length > 0) {
        await nextTick()

        await renderNextChunk()
      } else {
        hasMore.value = false
      }
    } catch (err) {
      console.error('🔴 직무 검색 실패:', err)
      hasMore.value = false
    } finally {
      isLoading.value = false
    }
  }

  const renderNextChunk = async () => {
    if (!hasMore.value || isPaging.value) return

    isPaging.value = true

    await new Promise(resolve => setTimeout(resolve, 300))

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

    isPaging.value = false
  }

  const reset = () => {
    searchQuery.value = ''
    fullResults.value = []
    postsToRender.value = []
    clientPage.value = 1
    hasMore.value = true
    isLoading.value = false
    isPaging.value = false
  }

  return {
    searchQuery,
    fullResults,
    postsToRender,
    clientPage,
    hasMore,
    isLoading,
    isPaging,
    fetchJobList,
    renderNextChunk,
    reset,
  }
}, {
  persist: {
    key: 'select-store',
    storage: sessionStorage,
    paths: ['searchQuery', 'fullResults']
  }
})
