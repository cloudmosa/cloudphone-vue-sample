// i.e. https://github.com/KittyGiraudel/focusable-selectors/blob/main/index.js
export const FOCUSABLE_CSS_SELECTOR = `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), *[tabindex], *[contenteditable]`

export function findFirstFocusable(container) {
  return container.querySelector(FOCUSABLE_CSS_SELECTOR)
}

export const autoFocusFirstFocusable = (element) => {
  if (element) {
    findFirstFocusable(element)?.focus()
  }
}

export const autoFocus = (element) => (element ? element.focus() : void 0)

export const getLanguageName = (contextLanguage, languageCode) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
  return new Intl.DisplayNames([contextLanguage], {
    type: 'language',
  }).of(languageCode || contextLanguage)
}
