import Keycloak from 'keycloak-js';
import type {
  KeycloakInterface,
  RefreshConfigInterface,
} from '@features/keycloak/types/types';
import type { UseAuthStoreReturnType } from '@features/keycloak/store/useAuthStore';

export class Service implements KeycloakInterface {
  constructor(
    protected keycloakInstance: Keycloak,
    protected userStore: UseAuthStoreReturnType,
    protected conf: RefreshConfigInterface,
  ) {}

  async login(): Promise<void> {
    this.userStore.errorMsg = '';
    try {
      const auth = await this.keycloakInstance.init({
        onLoad: 'login-required',
      });

      console.log(this.keycloakInstance);

      if (auth) {
        this.setAuthStore();
        await this.refreshToken();
      } else {
        this.userStore.errorMsg = 'Auth failed. Unknown error occurred';
      }
    } catch (error: unknown) {
      this.userStore.errorMsg = error as string;
    }
  }

  logout(): void {
    this.keycloakInstance?.logout();
  }

  async refreshToken(): Promise<void> {
    const refreshed = await this.keycloakInstance.updateToken(5);
    console.log('🌀 KEYCLOAK TOKEN refreshed', refreshed);

    if (refreshed) {
      this.setAuthStore();
    }

    setTimeout(async () => {
      await this.refreshToken();
    }, this.conf.refreshTokenMilliseconds);
  }

  /**
   * Sets the auth store with the user's information
   */
  setAuthStore(): void {
    this.userStore.user = {
      /**
       * The user's access token
       */
      accessToken: this.keycloakInstance.token as string,
      /**
       * The user's username
       */
      username: this.keycloakInstance?.tokenParsed
        ?.preferred_username as string,
      /**
       * The user's family name
       */
      family_name: this.keycloakInstance?.tokenParsed?.family_name as string,
      /**
       * The user's refresh token
       */
      refToken: this.keycloakInstance.refreshToken as string,
      /**
       * The user's roles
       */
      roles: this.keycloakInstance?.resourceAccess?.[
        import.meta.env.VITE_KEYCLOAK_CLIENT_ID
      ].roles as string[],
    };
  }
}
