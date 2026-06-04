<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import StatsCard from '@/components/ui/StatsCard.vue'

const auth = useAuthStore()

const stats = [
  { title: 'Total Revenue', value: '$48,295', change: 12.5 },
  { title: 'Active Users', value: '3,842', change: 8.1 },
  { title: 'New Signups', value: '294', change: -2.3 },
  { title: 'Churn Rate', value: '1.8%', change: -0.4 },
]
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {{ auth.fullName }}
      </h1>
      <p class="text-sm text-gray-500">Here's what's happening with your product today.</p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
      />
    </div>
  </div>
</template>
