<script setup>
import { ref, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
const { t, locale, availableLocales } = useI18n()
import AppHeader from './components/AppHeader.vue'

const defaultLocale = 'en'
const savedLanguage = localStorage.getItem('lang')

// This is a very niave approach. Consider using a library
// that doesn't drop country codes
function getDefaultLanguage(languageSet) {
  const preferredLanguage = (navigator.language || '').split('-')[0].toLowerCase()
  if (languageSet.has(preferredLanguage)) return preferredLanguage
  return defaultLocale
}

// Restore saved locale, or set a reasonable default
if (!locale.value || savedLanguage) {
  locale.value = savedLanguage || getDefaultLanguage(new Set(availableLocales))
}

const currentView = new ref(null)

// Expose title attribute to children
const title = ref(t('cloudphone'))
provide('title', title)
</script>

<template>
  <AppHeader :title="title" />
  <RouterView ref="currentView" />
</template>
