<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <main>
    <section id="app">
      <h2>{{ t('vuedemo') }}</h2>
      <p>{{ t('home.description') }}</p>
    </section>
  </main>
</template>

<style>
@import '../assets/home.css';
</style>
