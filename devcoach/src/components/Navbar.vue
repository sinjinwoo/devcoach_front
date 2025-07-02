<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isNavOpen = ref(false);
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};
</script>

<template>
  <nav class="bg-white shadow-md px-2 py-1 fixed top-0 left-0 w-full z-50">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <RouterLink to="/" class="flex items-center">
        <span class="self-center text-lg font-bold text-blue-600">DevCoach</span>
      </RouterLink>
      <button
        type="button"
        class="inline-flex items-center p-1 text-blue-600 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-controls="navbar-default"
        :aria-expanded="isNavOpen"
        aria-label="Toggle navigation"
        @click="toggleNav"
      >
        <span class="sr-only">Toggle navigation</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
      </button>
      <div
        :class="[
          'w-full md:block md:w-auto',
          isNavOpen ? 'block' : 'hidden'
        ]"
        id="navbar-default"
      >
        <ul class="flex flex-col gap-1 p-2 mt-2  bg-white md:flex-row md:space-x-2 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
          <li>
            <RouterLink to="/search" class="block px-2 py-1 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition">시작하기</RouterLink>
          </li>
          <li>
            <RouterLink to="/help" class="block px-2 py-1 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition">도움말</RouterLink>
          </li>
          <li>
            <RouterLink to="/login" class="block px-2 py-1 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition">로그인</RouterLink>
          </li>
          <li>
            <RouterLink to="/signup" class="block px-2 py-1 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition">회원가입</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 추가적인 커스텀 스타일이 필요하면 여기에 작성하세요 */
</style>
