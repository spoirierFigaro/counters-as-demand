import type { ThemeDefinition } from 'vuetify'
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { fr } from 'vuetify/locale'

const theme: ThemeDefinition = {
  dark: false,
  colors: {
    'light': '#f7f9fd',
    'primary': '#26aae1',
    'primary-dark': '#12729a',
    'mineral': '#404b56',
    'red': '#f90404',
    'success': '#5adfb7',
    'black': '#000000',
    'dark-grey': '#333333',
    'medium-grey': '#999999',
    'cool-grey': '#ececec',
    'light-grey': '#F9F9FB',
    'pale-grey-20': '#2c303a',
    'pale-grey-40': '#596073',
    'pale-grey-80': '#C5C9D3',
    'pale-grey-90': '#E2E4E9',
    'pale-grey-95': '#f1f1f4',
    'white': '#FFFFFF',
    'commodore-red-40': '#cc0050',
    'commodore-red-45': '#e6005a',
    'commodore-red-95': '#ffe6ef',
    'naval-blue-40': '#32559a',
    'naval-blue-50': '#3e6ac1',
    'naval-blue-95': '#ecf0f9',
    'greater-snake-green-20': '#006646',
    'greater-snake-green-30': '#009969',
    'greater-snake-green-30-white-opacity-20': '#ccebe1',
    'greater-snake-green-95': '#e5fff7',
    'pyrholidon-purple-40': '#814488',
    'error': '#BA1A1A',
  },
  variables: {
    'high-emphasis-opacity': 1,
  },
}

export default defineVuetifyConfiguration({
  /* vuetify options */
  icons: {
    defaultSet: 'mdi-svg',
  },
  locale: {
    locale: 'fr',
    messages: { fr },
  },
  defaults: {
    global: {
      // Disable the ripple effect on components that support it
      ripple: false,
    },
    VTextField: {
      variant: 'outlined',
      color: 'naval-blue-40',
    },
    VCheckbox: {
      color: 'naval-blue-40',
    },
  },
  theme: {
    defaultTheme: 'ce',
    themes: {
      ce: theme,
    },
  },

})
