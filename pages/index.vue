<template>
    <v-app>
      <v-main>
        <v-container class="pa-4">
  
          <v-row>
            <v-col cols="12">
              <h1>Counters as Demand</h1>
            </v-col>
          </v-row>
  
          <!-- Choix du nombre de compteurs -->
          <v-row class="mb-6">
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="[1,2,3,4,5]"
                v-model="countNumber"
                label="Nombre de compteurs"
              />
            </v-col>
          </v-row>
  
          <!-- Liste des compteurs -->
          <v-row dense>
            <v-col
              v-for="i in countNumber"
              :key="i"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card outlined>
                <v-card-text>
                  <v-text-field
                    v-model="names[i-1]"
                    :label="`Nom du compteur ${i}`"
                    dense
                    hide-details
                  />
                  <div class="display-1 my-4">
                    {{ names[i-1] || `Compteur ${i}` }} : {{ counters[i-1] }}
                  </div>
                  <v-btn icon color="red" @click="decrement(i-1)">
                    <v-icon>mdi-minus-circle-outline</v-icon>
                  </v-btn>
                  <v-btn icon color="green" @click="increment(i-1)">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
  
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  
  interface Settings {
    countNumber: number
    counters: number[]
    names: string[]
  }
  
  const STORAGE_KEY = 'counters-as-demand'
  
  // États réactifs
  const ready = ref(false)
  const countNumber = ref(1)
  const counters = ref<number[]>([0])
  const names = ref<string[]>([''])
  
  // 1) Restauration depuis localStorage
  onMounted(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const s = JSON.parse(raw) as Settings
        countNumber.value = s.countNumber
        counters.value   = s.counters
        names.value      = s.names
      } catch {}
    }
    ready.value = true
  })
  
  // 2) Ajuster la taille des tableaux
  watch(countNumber, (n) => {
    const len = counters.value.length
    if (n > len) {
      for (let i = len; i < n; i++) {
        counters.value.push(0)
        names.value.push('')
      }
    } else if (n < len) {
      counters.value.splice(n)
      names.value.splice(n)
    }
  })
  
  // 3) Persister à chaque changement
  watch(
    [countNumber, counters, names],
    () => {
      const payload: Settings = {
        countNumber: countNumber.value,
        counters:     counters.value,
        names:        names.value
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    },
    { deep: true }
  )
  
  function increment(i: number) { counters.value[i]++ }
  function decrement(i: number) { counters.value[i]-- }
  </script>
  
  <style scoped>
  h1 {
    font-weight: 400;
  }
  .display-1 {
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
  }
  </style>