<script setup>
import { ref, inject, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale, fallbackLocale, availableLocales } = useI18n({ useScope: 'global' })
import { autoFocus, getLanguageName } from '../utils.js'
import OptionsMenu from '../components/OptionsMenu.vue'
import SoftKeyBar from '../components/SoftKeyBar.vue'

const langButton = ref(null)
const isMenuVisible = ref(location.hash.includes('#menu'))

const currentLanguage = computed(() => locale.value || fallbackLocale.value)
const languageName = computed(() => getLanguageName(currentLanguage.value))

watch(langButton, (buttonRef) => autoFocus(buttonRef?.value))
watch(locale, () => {
  if (title) title.value = t('settings')
})

const title = inject('title')
if (title) title.value = t('settings')

function showLanguageSelector() {
  isMenuVisible.value = true
}

function onMenuClose(item) {
  // Update the current locale
  if (availableLocales.includes(item?.props?.key)) {
    locale.value = item?.props?.key
    localStorage.setItem('lang', locale.value)
  }

  // Hide menu
  isMenuVisible.value = false

  // Restore focus to button
  autoFocus(langButton?.value)
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
    <button
      ref="langButton"
      :autofocus="true"
      class="focused"
      role="menuitem"
      v-on:click="showLanguageSelector"
    >
      <span class="title">{{ t('language') }}</span>
      <span class="description">{{ languageName }}</span>
    </button>
  </section>

  <OptionsMenu :visible="isMenuVisible" @menu-item-selected="onMenuClose" @close="onMenuClose">
    <template v-for="availableLocale in availableLocales" :key="availableLocale">
      <a :href="'#' + availableLocale">{{
        getLanguageName(currentLanguage, availableLocale)
      }}</a></template
    >
  </OptionsMenu>

  <SoftKeyBar
    :buttons="{
      end: { icon: 'back' },
    }"
    :onSoftKeyClick="onSoftKeyClick"
  />
</template>

<style>
@import '../assets/home.css';

button[role='menuitem'] {
  background: transparent;
  border: none;
  color: white;
  margin: 0;
  padding: 4pt 0;
  display: block;
  width: 100%;
  text-align: start;
}

button[role='menuitem'].focused,
button[role='menuitem']:focus {
  background-color: #1971e6;
  outline: none;
  border-image-source: conic-gradient(#1971e6 0 0);
  border-image-slice: 10;
  border-image-outset: 0 8pt 0 8pt;
  border-image-width: 100vw;
  border-image-repeat: repeat;
}

button[role='menuitem'] .title,
button[role='menuitem'] .description {
  width: 100%;
  display: block;
}

button[role='menuitem'] .title {
  font-size: 12pt;
  font-weight: bold;
}

button[role='menuitem'] .description {
  font-size: 10pt;
}

/* QVGA */
@media only screen and (min-width: 129px) and (max-width: 240px) {
  button[role='menuitem'] {
    padding: 8pt 0;
  }
}
</style>
