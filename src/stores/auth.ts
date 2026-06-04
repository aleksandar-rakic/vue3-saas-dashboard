import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/composables/useApi'

interface User {
  id: number
  name: string
  email: string
  avatar: string | null
  role: 'admin' | 'member'
  plan: 'starter' | 'pro' | 'enterprise'
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const loading = ref(false)

    const isAuthenticated = computed(() => !!token.value && !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const fullName = computed(() => user.value?.name ?? '')

    async function login(email: string, password: string): Promise<void> {
      loading.value = true
      try {
        const { data } = await api.post<{ token: string; user: User }>('/auth/login', {
          email,
          password,
        })
        token.value = data.token
        user.value = data.user
        await router.push({ name: 'dashboard' })
      } finally {
        loading.value = false
      }
    }

    async function logout(): Promise<void> {
      try {
        await api.post('/auth/logout')
      } finally {
        token.value = null
        user.value = null
        await router.push({ name: 'login' })
      }
    }

    async function fetchCurrentUser(): Promise<void> {
      if (!token.value) return
      const { data } = await api.get<User>('/auth/me')
      user.value = data
    }

    return {
      user,
      token,
      loading,
      isAuthenticated,
      isAdmin,
      fullName,
      login,
      logout,
      fetchCurrentUser,
    }
  },
  {
    persist: {
      pick: ['token', 'user'],
    },
  } as any,
)
