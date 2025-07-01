<script setup>
import { ref, onMounted } from 'vue'
import Card from '@/components/Card.vue'

const posts = ref([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)

const fetchPosts = async () => {
    if (loading.value || !hasMore.value) return
    loading.value = true
    // 예시: 실제 API로 교체
    const res = await fetch(`/api/posts?page=${page.value}`)
    const data = await res.json()
    if (data.length === 0) {
        hasMore.value = false
    } else {
        posts.value.push(...data)
        page.value++
    }
    loading.value = false
}

const handleScroll = () => {
    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.documentElement.offsetHeight
    if (scrollY + innerHeight + 100 >= offsetHeight) {
        fetchPosts()
    }
}

onMounted(() => {
    fetchPosts()
    window.addEventListener('scroll', handleScroll)
})

</script>

<template>
    <div>
        <Card
            v-for="post in posts"
            :key="post.id"
            :post="post"
        />
        <div v-if="loading">로딩 중...</div>
        <div v-if="!hasMore">더 이상 데이터가 없습니다.</div>
    </div>
</template>

<style scoped>
/* 필요시 스타일 추가 */
</style>
