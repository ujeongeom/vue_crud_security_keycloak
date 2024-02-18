
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: () => import('@/views/Login.vue') },
    { path: '/login', component: () => import('@/views/Login.vue') },
    {
      path: '/employees',
      component: () => import('@/views/Employees.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

export default router;
