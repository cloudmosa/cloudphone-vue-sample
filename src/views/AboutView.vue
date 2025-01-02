<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section id="app">
    <h2>{{ t('about') }}</h2>
    <p>{{ t('about.description') }}</p>
  </section>
</template>

<style>
@import '../assets/home.css';
</style>
