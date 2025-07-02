<template>
    <div class="flex flex-wrap gap-3 mt-6 justify-center">
        <button
            v-for="job in jobs"
            :key="job"
            @click="$emit('select', job)"
            class="px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:from-blue-500 hover:to-indigo-600 transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
            <span class="drop-shadow">{{ job }}</span>
        </button>
    </div>
</template>

<script setup>
defineProps({
  jobs: Array,
})
defineEmits(['select'])
</script>
