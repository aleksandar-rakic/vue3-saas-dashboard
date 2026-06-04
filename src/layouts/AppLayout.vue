<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <aside class="w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div class="flex h-16 items-center px-6">
        <span class="text-xl font-bold text-brand-600">SaaS App</span>
      </div>
      <nav class="mt-4 space-y-1 px-3">
        <RouterLink
          to="/"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          active-class="bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
        >
          Overview
        </RouterLink>
        <RouterLink
          to="/analytics"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          active-class="bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
        >
          Analytics
        </RouterLink>
        <RouterLink
          v-if="auth.isAdmin"
          to="/settings"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          active-class="bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
        >
          Settings
        </RouterLink>
      </nav>
      <div class="absolute bottom-4 left-0 w-64 px-3">
        <button
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
          @click="auth.logout()"
        >
          Sign out
        </button>
      </div>
    </aside>
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
