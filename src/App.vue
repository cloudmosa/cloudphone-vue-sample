<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import AppHeader from './components/AppHeader.vue'
import SoftKeyBar from './components/SoftKeyBar.vue'
import OptionsMenu from './components/OptionsMenu.vue'

const isMenuVisible = ref(location.hash.includes('#menu'))

function handleMenuItemSelected() {
  isMenuVisible.value = false
}

function handleSoftKeyClick(position) {
  switch (position) {
    case 'start':
      isMenuVisible.value = !isMenuVisible.value
      break
    case 'center':
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
  <header>
    <AppHeader :title="t('cloudphone')" />
    <img alt="Cloud Phone logo" class="logo" src="@/assets/icon.png" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <SoftKeyBar
    :buttons="{
      start: { icon: 'menu' },
      center: { title: t('select'), icon: 'select' },
      end: { icon: 'back' },
    }"
    :onSoftKeyClick="handleSoftKeyClick"
  />

  <OptionsMenu
    :visible="isMenuVisible"
    @menu-item-selected="handleMenuItemSelected"
    @close="handleMenuItemSelected"
  >
    <RouterLink to="/about">{{ t('about') }}</RouterLink>
    <RouterLink to="/settings">{{ t('settings') }}</RouterLink>
    <a href="https://www.cloudfone.com/dev-privacy" target="_self">
      {{ t('privacy') }}
    </a>
  </OptionsMenu>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
