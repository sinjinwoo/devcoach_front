<template>
    <section class="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        <!-- 배경 장식 -->
        <div class="absolute top-0 left-0 w-100 h-100 bg-purple-200 opacity-20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-30 rounded-full blur-2xl -z-10"></div>

        <!-- 왼쪽: 이미지 -->
        <div class="h-99 w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
            <img
                src="@/assets/intro-image.png"
                alt="help"
                class="w-full max-w-md md:max-w-lg h-auto object-contain drop-shadow-2xl rounded-3xl border-3 border-white"
            />
        </div>

        <!-- 오른쪽: 도움말 텍스트 -->
        <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-8 bg-white/80 rounded-3xl shadow-2xl p-10 border border-blue-100 backdrop-blur-md">
            <h1 class="text-4xl md:text-5xl font-extrabold text-blue-800 leading-tight drop-shadow mb-2 tracking-tight">
                서비스 이용 가이드
            </h1>
            <div class="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mb-2"></div>
            <ul class="text-gray-800 text-lg md:text-xl font-medium space-y-5">
                <li class="flex items-start">
                    <span class="mr-3 text-blue-500 text-2xl flex-shrink-0 self-center">1.</span>
                    <span>
                        서비스를 시작하면 <span class="text-blue-600 font-semibold">사람인 기준 기업 이름</span>을 검색하세요.
                    </span>
                </li>
                <li class="flex items-start">
                    <span class="mr-3 text-blue-500 text-2xl">2.</span>
                    <span>
                        검색된 채용 공고 중 <span class="text-blue-600 font-semibold">원하는 공고</span>를 선택하세요.
                    </span>
                </li>
                <li class="flex items-start">
                    <span class="mr-3 text-blue-500 text-2xl">3.</span>
                    <span>
                        공고의 내용 중 <span class="text-blue-600 font-semibold">원하는 직무</span>를 선택하세요.
                    </span>
                </li>
                <li class="flex items-start">
                    <span class="mr-3 text-blue-500 text-2xl">4.</span>
                    <span>
                        자신이 작성한 <span class="text-blue-600 font-semibold">자기소개서 문항과 답변</span>을 입력하면,
                    </span>
                </li>
                <li class="flex items-start ml-8">
                    <span class="mr-3 text-green-600 text-xl">→</span>
                    <span>
                        <span class="font-semibold text-green-700">채용 공고 기반 AI 피드백</span>을 받을 수 있어요!
                    </span>
                </li>
            </ul>
            <div class="flex justify-center mt-6 w-full">
                <button 
                    class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all font-semibold text-lg"
                    @click="$router.push('/search')">
                    바로 시작하기
                </button>
            </div>
        </div>
    </section>
</template>
