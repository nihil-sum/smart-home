import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '../utils/request'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || '')

  const isLoggedIn = computed(() => !!token.value)
  const role = computed(() => user.value?.role || '')
  const isTenant = computed(() => role.value === 'tenant')
  const isLandlord = computed(() => role.value === 'landlord')
  const isAdmin = computed(() => role.value === 'admin')

  function saveAuth(userData, tokenStr) {
    user.value = userData
    token.value = tokenStr
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenStr)
  }

  async function login(credentials) {
    const res = await request.post('/auth/login', credentials)
    saveAuth(res.user, res.token)
    return res
  }

  async function register(data) {
    const res = await request.post('/auth/register', data)
    saveAuth(res.user, res.token)
    return res
  }

  function logout() {
    user.value = null
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  async function checkAuth() {
    if (!token.value) return false
    try {
      const res = await request.get('/auth/me')
      user.value = res.user
      localStorage.setItem('user', JSON.stringify(res.user))
      return true
    } catch {
      logout()
      return false
    }
  }

  return { user, token, isLoggedIn, role, isTenant, isLandlord, isAdmin, login, register, logout, checkAuth, saveAuth }
})
