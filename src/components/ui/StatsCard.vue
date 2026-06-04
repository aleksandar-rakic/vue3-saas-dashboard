<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  title: string
  value: string | number
  change?: number
  icon?: Component
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const isPositive = props.change !== undefined && props.change >= 0
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ title }}</p>
      <component
        :is="icon"
        v-if="icon"
        class="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </div>

    <div v-if="loading" class="mt-2 h-8 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    <p v-else class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ value }}
    </p>

    <div v-if="change !== undefined" class="mt-2 flex items-center gap-1 text-sm">
      <span :class="isPositive ? 'text-green-600' : 'text-red-600'">
        {{ isPositive ? '↑' : '↓' }} {{ Math.abs(change) }}%
      </span>
      <span class="text-gray-500">vs last month</span>
    </div>
  </div>
</template>
