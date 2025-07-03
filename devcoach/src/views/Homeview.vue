<template>
    <section class="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        <!-- 배경 장식 -->
        <div class="absolute top-0 left-0 w-100 h-100 bg-blue-200 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-2xl -z-10"></div>
        <!-- 왼쪽: 이미지 -->
        <div class="h-99 w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
            <img
                src="@/assets/intro-image.png"
                alt="intro"
                class="w-full max-w-md md:max-w-lg h-auto object-contain drop-shadow-2xl rounded-3xl border-3 border-white"
            />
        </div>
        <!-- 오른쪽: 텍스트 -->
        <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <h1 class="text-4xl md:text-6xl font-extrabold text-blue-800 leading-tight drop-shadow mb-2">
                AI 기반<br />
                <span class="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">자소서 첨삭 서비스</span>
            </h1>
            <p class="text-lg md:text-2xl text-gray-700 font-medium mb-4">
                지원 기업의 모집요강을 바탕으로<br class="hidden md:block" />
                자기소개서를 분석해드려요.
            </p>
            <div class="flex justify-center md:justify-start space-x-4 mt-4">
                <button 
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all font-semibold text-lg"
                @click="$router.push('/search')">
                    시작하기
                </button>
                <button class="px-8 py-3 border-2 border-blue-400 text-blue-600 rounded-2xl bg-white shadow hover:bg-blue-50 hover:border-blue-600 transition-all font-semibold text-lg"
                @click="$router.push('/help')">
                    도움말
                </button>
            </div>
        </div>
    </section>
</template>
