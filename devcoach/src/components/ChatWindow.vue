<template>
    <div
        ref="chatContainer"
        class="flex-1 mb-2 overflow-y-auto space-y-3"
         style="max-height: 45vh; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
    
        <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="flex items-end"
            :class="msg.role === 'bot' ? 'justify-start' : 'justify-end'"
        >
            <div
                v-if="msg.role === 'bot'"
                class="flex items-end space-x-2"
            >
                <img
                    src="../assets/intro-image.png"
                    alt="Bot"
                    class="w-8 h-8 rounded-full border border-blue-200 shadow"
                />
                <div
                    class="relative max-w-xs px-4 py-2 rounded-2xl bg-blue-100 text-blue-800 whitespace-pre-line shadow-md"
                >
                    <span>{{ msg.content }}</span>
                    <span class="absolute left-0 bottom-0 w-3 h-3 bg-blue-100 rounded-bl-2xl"></span>
                </div>
            </div>
            <div
                v-else
                class="flex items-end space-x-2 flex-row-reverse"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="User"
                    class="w-8 h-8 rounded-full border border-gray-200 shadow"
                />
                <div
                    class="relative max-w-xs px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 whitespace-pre-line shadow-md"
                >
                    <span>{{ msg.content }}</span>
                    <span class="absolute right-0 bottom-0 w-3 h-3 bg-gray-200 rounded-br-2xl"></span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, watch, nextTick } from 'vue'

// props 받기
const { messages } = defineProps({
  messages: {
    type: Array,
    required: true,
  },
})

const chatContainer = ref(null)

// messages 배열 길이가 바뀌면 스크롤 아래로 이동
watch(
  () => messages.length,
  async () => {
    await nextTick() // DOM 업데이트 후
    const el = chatContainer.value
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }
)
</script>
