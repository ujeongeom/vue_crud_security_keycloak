/**
 * VITE_KEYCLOAK_ENABLED=false 일 경우 본 파일을 사용한다.
 */
import type { KeycloakInterface } from '@/features/keycloak/types/types';
import type { UseAuthStoreReturnType } from '@/features/keycloak/store/useAuthStore';
// Mocked User
import testUser from '@features/keycloak/fixtures/test-user.json';

export class ServiceMock implements KeycloakInterface {
  constructor(protected userStore: UseAuthStoreReturnType) {}

  async login(): Promise<void> {
    this.userStore.user = testUser;
  }

  logout(): void {
    this.userStore.user = null;
  }
}
