<template>
  <form
    @submit.prevent="submit"
    class="flex flex-col gap-4 px-6 py-3 border-t bg-white"
  >
    <div>
      <label class="block mb-1 font-semibold text-gray-700">자소서 문항</label>
      <textarea
        v-model="question"
        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 resize-none transition"
        rows="2"
        required
      />
    </div>
    <div>
      <label class="block mb-1 font-semibold text-gray-700">답변</label>
      <textarea
        v-model="answer"
        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 resize-none transition"
        rows="2"
        required
      />
    </div>
    <button
      type="submit"
      class="h-10 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-md shadow hover:from-green-500 hover:to-green-700 transition self-end"
    >
      제출
    </button>
  </form>
</template>


<script setup>
import { ref } from 'vue'
const question = ref('')
const answer = ref('')

const emit = defineEmits(['submit'])

const submit = () => {
  if (question.value && answer.value) {
    emit('submit', { question: question.value, answer: answer.value })
    question.value = ''
    answer.value = ''
  }
}
</script>
