<script setup>
import { inject, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
const { t } = useI18n()
import OptionsMenu from '../components/OptionsMenu.vue'
import SoftKeyBar from '../components/SoftKeyBar.vue'

const title = inject('title')

if (title) {
  title.value = t('cloudphone')
}

const isMenuVisible = ref(location.hash.includes('#menu'))

function hideMenu() {
  isMenuVisible.value = false
}

// Lifecycle hooks for event listeners
onMounted(() => {
  window.addEventListener('popstate', hideMenu)
})

onUnmounted(() => {
  window.removeEventListener('popstate', hideMenu)
})

function onSoftKeyClick(position) {
  switch (position) {
    case 'start':
      isMenuVisible.value = !isMenuVisible.value
      break
    // This is the default behavior of Cloud Phone
    // It cannot be overriden by widgets
    case 'end':
      history.back()
      break
  }
}
</script>

<template>
  <section id="app">
    <h2>{{ t('vuedemo') }}</h2>
    <p>{{ t('home.description') }} <a href="https://cloudfone.com">https://cloudfone.com</a></p>
  </section>

  <OptionsMenu :visible="isMenuVisible" @menu-item-selected="hideMenu" @close="hideMenu">
    <RouterLink to="/about">{{ t('about') }}</RouterLink>
    <RouterLink to="/settings">{{ t('settings') }}</RouterLink>
    <a href="https://www.cloudfone.com/dev-privacy" target="_self">
      {{ t('privacy') }}
    </a>
  </OptionsMenu>

  <SoftKeyBar
    :buttons="{
      start: { icon: 'menu' },
      center: { title: t('select'), icon: 'select' },
      end: { icon: 'back' },
    }"
    :onSoftKeyClick="onSoftKeyClick"
  />
</template>

<style>
@import '../assets/home.css';
</style>
