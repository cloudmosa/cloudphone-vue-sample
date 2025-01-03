<script setup>
import { ref, watch, onMounted, onUnmounted, useSlots, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { autoFocusFirstFocusable } from '../utils.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  onMenuItemSelected: {
    type: Function,
    default: () => {},
  },
  onClose: {
    type: Function,
    default: () => {},
  },
})

const router = useRouter()
const slots = useSlots()
const menuRef = ref(null)
const focusedIndex = ref(0)

// Update the hash when the menu is open
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      router.push({ hash: '#menu' })
    }
  },
)

const handlePopState = () => {
  if (location.hash.includes('#menu')) {
    props.onClose()
  }
}

// Handle key navigation and selection
const handleKeyDown = (e) => {
  if (!props.visible) return
  const items = menuRef.value?.querySelectorAll('[role="menuitem"]')

  if (!items?.length) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      focusedIndex.value = (focusedIndex.value + 1) % items.length
      break
    case 'ArrowUp':
      e.preventDefault()
      focusedIndex.value = (focusedIndex.value - 1 + items.length) % items.length
      break
    case 'Enter':
      e.preventDefault()
      if (items[focusedIndex.value]) {
        items[focusedIndex.value].click()
        const children = getNestedChildren(slots.default?.() || [])
        props.onMenuItemSelected(children[focusedIndex.value])
      }
      break
  }
}

// Handle click events for menu item selection
const handleClick = (event, index) => {
  // Anchor links are used as buttons
  // Relative URLs (i.e. '/settings') or external HTTPS links use default
  if (event.target instanceof HTMLAnchorElement) {
    const href = event.target.getAttribute('href')
    if (href.startsWith('#')) event.preventDefault()
  }

  const children = getNestedChildren(slots.default?.() || [])
  props.onMenuItemSelected(children[index])
}

// Update focus whenever focusedIndex changes
watch(focusedIndex, (newIndex) => {
  nextTick(() => {
    const items = menuRef.value?.querySelectorAll('[role="menuitem"]')
    if (items?.[newIndex]) {
      items[newIndex].focus()
    }
  })
})

watch(menuRef, (newRef) => autoFocusFirstFocusable(newRef?.value))

// Lifecycle hooks for event listeners
onMounted(() => {
  window.addEventListener('popstate', handlePopState)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
  window.removeEventListener('keydown', handleKeyDown)
})

// Workaround for nested HTML elements created with v-for loop
const getNestedChildren = (slots) => {
  if (slots.length === 1 && slots[0].children) {
    return slots[0].children
  }
  return slots
}
</script>

<template>
  <menu v-if="visible" ref="menuRef" role="menu" :hidden="!visible" :aria-hidden="!visible">
    <component
      v-for="(child, index) in getNestedChildren(slots.default?.() || [])"
      :key="index"
      :is="child"
      role="menuitem"
      :tabindex="index"
      :autofocus="index === focusedIndex"
      :class="{ focused: index === focusedIndex }"
      @click="(e) => handleClick(e, index)"
    />
  </menu>
</template>

<style scoped>
menu {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: black;
  padding: 0;
  margin: 0;
}

menu[hidden] {
  display: none;
}

menu > * {
  margin: 0;
  padding: 0.35em 4pt;
  font-size: 1em;
  color: white;
  background: transparent;
  appearance: none;
  text-align: start;
  display: block;
  width: 100%;
  white-space: nowrap;
  border: none;
  outline: none;
  text-decoration: none;
}

menu > a {
  text-decoration: none;
  outline: none;
}

:global(menu > *.focused, menu > *:focus, menu > *:active) {
  background-color: #1971e6;
}

menu > *.focused,
menu > *:focus,
menu > *:active {
  background-color: #1971e6;
}

/* QVGA */
@media only screen and (min-width: 129px) and (max-width: 240px) {
  menu > * {
    padding: 0.35em 8pt;
    font-size: 1.4em;
  }

  menu {
    height: calc(100vh - 36px);
  }
}

/* QQVGA */
@media only screen and (max-width: 128px) {
  menu {
    height: calc(100vh - 20px);
  }
}
</style>
