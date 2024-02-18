import { defineStore } from 'pinia';

export type UseAuthStoreReturnType = ReturnType<typeof useAuthStore>;

interface DevpilotUserProfile {
  username: string;
  family_name: string;
  refToken: string;
  accessToken: string;
  roles: string[];
}

export type UserStore = {
  user: DevpilotUserProfile | null;
  errorMsg: string;
};

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: (): UserStore => ({
    user: null,
    errorMsg: '',
  }),
  getters: {
    authenticated(): boolean {
      return !!this.user?.accessToken;
    },
  },
  actions: {
    // addRole(role: string): void {
    //   this.user?.roles?.push(role);
    // },
  },
});
