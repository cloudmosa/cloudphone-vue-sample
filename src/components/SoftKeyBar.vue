<script setup>
import { onMounted, onUnmounted } from 'vue'
import MenuIcon from './icons/IconMenu.vue'
import BackIcon from './icons/IconBack.vue'
import SelectIcon from './icons/IconSelect.vue'

const props = defineProps({
  buttons: {
    type: Object,
    default: () => ({}),
  },
  onSoftKeyClick: {
    type: Function,
    default: () => {},
  },
})

const getIconComponent = (name) => {
  switch (name) {
    case 'menu':
      return MenuIcon
    case 'back':
      return BackIcon
    case 'select':
      return SelectIcon
    default:
      return null
  }
}

const handleEvent = (event, position) => {
  if (!props.onSoftKeyClick) return

  if (event instanceof KeyboardEvent) {
    switch (event.key) {
      /* Left Soft Key (LSK) */
      case 'Escape':
        return props.onSoftKeyClick('start')
      case 'Enter':
        return props.onSoftKeyClick('center')
      /* Widgets cannot intercept RSK */
    }
  }

  if (position) {
    props.onSoftKeyClick(position)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEvent)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEvent)
})
</script>

<template>
  <footer>
    <button
      v-for="position in ['start', 'center', 'end']"
      :key="position"
      :class="{ disabled: !buttons[position] }"
      :disabled="!buttons[position]"
      :aria-disabled="!buttons[position]"
      :title="buttons[position]?.title"
      @click="(e) => handleEvent(e, position)"
    >
      <template v-if="buttons[position]">
        <component v-if="buttons[position].component" :is="buttons[position].component" />
        <template v-else>
          <component v-if="buttons[position].icon" :is="getIconComponent(buttons[position].icon)" />
          {{ buttons[position].text }}
        </template>
      </template>
    </button>
  </footer>
</template>

<style scoped>
footer {
  width: 100vw;
  display: flex;
  white-space: nowrap;
  background: black;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}

footer > button {
  flex: 0 1 33.3%;
  display: inline-block;
  vertical-align: middle;
  appearance: none;
  background: transparent;
  border: none;
  color: white;
}

/* QVGA */
@media only screen and (min-width: 129px) and (max-width: 240px) {
  footer {
    height: 36px;
  }

  footer > button svg {
    transform: scale(1.5);
  }

  footer > button {
    padding: 0 8pt;
  }
}

/* QQVGA */
@media only screen and (max-width: 128px) {
  footer {
    height: 20px;
  }

  footer > button {
    padding: 0 4pt;
  }
}

footer > button[disabled] {
  pointer-events: none;
}

footer > button:nth-child(1) {
  align-content: start;
  text-align: start;
}

footer > button:nth-child(2) {
  align-content: center;
  text-align: center;
  text-transform: uppercase;
  flex-grow: 1;
  flex-shrink: 0;
}

footer > button:nth-child(3) {
  align-content: end;
  text-align: end;
}
</style>
