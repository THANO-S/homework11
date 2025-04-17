import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import CardDetail from './views/CardDetail.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

import { useAuth } from './composables/useAuth'
const { isAuthenticated } = useAuth()

const routes = [
  { path: '/homework11/', name: 'Home', component: HomePage },
  { path: '/homework11/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/homework11/employees/:id', name: 'CardDetail', component: CardDetail },
  { path: '/homework11/login', name: 'LoginPage', component: LoginPage },
  { path: '/homework11/settings', name: 'SettingsPage', component: SettingsPage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//navigation guard 
router.beforeEach((to, _, next) => {
  if(to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'LoginPage', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
