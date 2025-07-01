<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
        <!-- 배경 블러 효과 -->
        <div class="w-3/4 flex justify-center">
            <div class="flex items-center w-full max-w-2xl border border-blue-300  rounded-lg shadow px-4 py-3">
                <input
                    v-model="searchQuery"
                    @keyup.enter="handleSearch"
                    type="text"
                    placeholder="기업명을 입력하세요"
                    class="flex-1 bg-transparent outline-none text-lg px-2"
                />
                <button class="ml-2 p-2 rounded hover:bg-blue-200 transition" @click="handleSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7" stroke="#888" stroke-width="2"/>
                        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#888" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
