import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    allowOnly: true,
    passWithNoTests: true,
  },
})
