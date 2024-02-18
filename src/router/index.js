/*import { createRouter, createWebHistory } from 'vue-router';
//import { routes } from './routes';

//import { useAuthStore } from '@/keycloak/store/useAuthStore';
//import { serviceFactory } from '@/keycloak/services/factory';

import { inject } from 'vue';

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  //routes: routes,
  routes: [
    { path: '/', component: () => import('@/views/Login.vue') },
    //{ path: '/', component: () => import('@/views/Employees.vue') },
    { path: '/login', component: () => import('@/views/Login.vue') },
    { path: '/employees', component: () => import('@/views/Employees.vue') },
    {
      path: '/:catchAll(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFoundPage.vue')
    }
  ]
});


router.beforeEach(
  async (to, from) => {

      const keycloak = inject('keycloak');

      console.log('keycloak isLoggedIn', keycloak.authenticated);

      if (keycloak.authenticated){
          //localStorage.setItem('user', keycloak.accessToken);
          localStorage.setItem('user', JSON.stringify(keycloak.accessToken));
          localStorage.setItem('isLoggedIn', JSON.stringify(keycloak.authenticated));
      }

      if (to.meta.requiresAuth) {
          if (keycloak.authenticated && keycloak.hasRealmRole('MOVIES_MANAGER')) {
              return true;
          }

          else if (keycloak.authenticated) {
              return { name: 'Unauthorized' };
          }

          else {
              const basePath = window.location.toString();
              await keycloak.login({redirectUri: basePath.slice(0, -1) + to.path});
              return true;
          }

      } else {
          return true;
      }
  }
);
*/

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
