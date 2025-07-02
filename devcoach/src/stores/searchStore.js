import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios' 

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('')
  const searchResults = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const hasResults = computed(() => searchResults.value.length > 0)
  
  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    isLoading.value = false
    error.value = null
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }
  const setSearchResults = (results) => {
    searchResults.value = results
  }
  const setLoading = (loading) => {
    isLoading.value = loading
  }
  const setError = (err) => {
    error.value = err
  }
  const getSearchQuery = () => {
    return searchQuery.value
  }
  const getSearchResults = () => {
    return searchResults.value
  }
  const getIsLoading = () => {
    return isLoading.value
  }
  const getError = () => {
    return error.value
  } 
return {
    searchQuery,
    searchResults,
    isLoading,
    error,
    hasResults,
    clearSearch,
    setSearchQuery,
    setSearchResults,
    setLoading,
    setError,
    getSearchQuery,
    getSearchResults,
    getIsLoading,
    getError
  }
})  
