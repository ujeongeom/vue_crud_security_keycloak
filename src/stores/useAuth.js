import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import router from '@/router';

//const baseUrl = `${import.meta.env.VITE_API_URL}/api`;
const authUrl = '/api/login';

import { inject } from 'vue';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {

    async login() {
      //const user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });
      //const user = await fetchWrapper.post(authUrl, { username, password });

      const keycloak = inject('keycloak');

      console.log('keycloak isLoggedIn', keycloak.authenticated);

      if (keycloak.authenticated){
          //localStorage.setItem('user', keycloak.token);
          localStorage.setItem('user', JSON.stringify(keycloak.token));
          localStorage.setItem('isLoggedIn', JSON.stringify(keycloak.authenticated));
      }

      if (keycloak.authenticated && keycloak.hasRealmRole('MOVIES_MANAGER')) {
          return true;
      }

      else if (keycloak.authenticated) {
          return { name: 'Unauthorized' };
      }

      else {
          const basePath = window.location.toString();
          await keycloak.login({redirectUri: basePath.slice(0, -1)});
          return true;
      }

      // update pinia state
      //this.user = user;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      //localStorage.setItem('user', JSON.stringify(user));

      // redirect to previous url or default to home page
      //router.push(this.returnUrl || '/employees');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
});

