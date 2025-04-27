import antfu from '@antfu/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'
// You can either use the Nuxt DevTools panel to inspect the resolved ESLint flat config, or manually run `npx @eslint/config-inspector`
export default withNuxt(antfu({
  rules: {
    'antfu/top-level-function': 'off',
    'no-console': 'off',
    'vue/attributes-order': ['error', {
      alphabetical: false,
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
      ],
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 3,
    }],
    'perfectionist/sort-enums': ['error', {
      type: 'natural',
    }],
  },
  yaml: false,
}))
