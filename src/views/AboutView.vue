<script setup>
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import SoftKeyBar from '../components/SoftKeyBar.vue'

const title = inject('title')
if (title) {
  title.value = t('about')
}

function onSoftKeyClick(position) {
  switch (position) {
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
    <h2>{{ t('about') }}</h2>
    <p>{{ t('about.description') }}</p>
  </section>

  <SoftKeyBar
    :buttons="{
      end: { icon: 'back' },
    }"
    :onSoftKeyClick="onSoftKeyClick"
  />
</template>

<style>
@import '../assets/home.css';
</style>
