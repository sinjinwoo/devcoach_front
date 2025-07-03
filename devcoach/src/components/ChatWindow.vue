<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const { messages } = defineProps({
    messages: {
        type: Array,
        required: true,
    },
})

const chatContainer = ref(null)
const dotCount = ref(0)
let dotTimer = null

watch(
    () => messages.length,
    async () => {
        await nextTick()
        const el = chatContainer.value
        if (el) {
            el.scrollTop = el.scrollHeight
        }
    }
)

watch(
    () => messages[messages.length - 1]?.content,
    (latest) => {
        if (latest?.startsWith(' ')) {
            startDotAnimation()
        } else {
            stopDotAnimation()
        }
    },
    { immediate: true }
)

function startDotAnimation() {
    let count = 0
    stopDotAnimation()
    dotTimer = setInterval(() => {
        count = (count + 1) % 4
        dotCount.value = count
    }, 500)
}

function stopDotAnimation() {
    if (dotTimer) {
        clearInterval(dotTimer)
        dotTimer = null
        dotCount.value = 0
    }
}

onUnmounted(() => {
    stopDotAnimation()
})
</script>

<template>
    <div
        ref="chatContainer"
        class="flex-1 mb-2 overflow-y-auto space-y-3"
        style="max-height: 45vh; padding: 20px; background-color: #f9f9f9; border-radius: 10px;"
    >
        <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="flex items-end"
            :class="msg.role === 'bot' ? 'justify-start' : 'justify-end'"
        >
            <!-- Bot 메시지 -->
            <div v-if="msg.role === 'bot'" class="flex items-end space-x-2">
                <img
                    src="../assets/intro-image.png"
                    alt="Bot"
                    class="w-8 h-8 rounded-full border border-blue-200 shadow"
                />
                <div
                    class="relative max-w-xs px-4 py-2 rounded-2xl bg-blue-100 text-blue-800 whitespace-pre-line shadow-md"
                >
                    <template v-if="msg.content.startsWith(' ')">
                        {{ msg.content }}
                        <span class="inline-flex items-center ml-2">
                            <span
                                v-for="n in 3"
                                :key="n"
                                class="mx-0.5"
                            >
                                <span
                                    v-if="n <= dotCount"
                                    class="inline-block w-3 h-3 rounded-full bg-gray-400"
                                ></span>
                                <span
                                    v-else
                                    class="inline-block w-3 h-3 rounded-full bg-gray-200"
                                ></span>
                            </span>
                        </span>
                    </template>
                    <span v-else>
                        {{ msg.content }}
                    </span>
                    <span class="absolute left-0 bottom-0 w-3 h-3 bg-blue-100 rounded-bl-2xl"></span>
                </div>
            </div>

            <!-- User 메시지 -->
            <div v-else class="flex items-end space-x-2 flex-row-reverse">
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
