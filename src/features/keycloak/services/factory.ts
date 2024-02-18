import Keycloak from 'keycloak-js';
import { keycloakConfig, refreshConfig } from '@features/keycloak/config';
import type { KeycloakInterface } from '@features/keycloak/types/types';
import type { UseAuthStoreReturnType } from '@features/keycloak/store/useAuthStore';
import { ServiceMock } from '@features/keycloak/services/service-mock';
import { Service } from '@features/keycloak/services/service';

let keycloakInstance: KeycloakInterface | null = null;

function createKeycloakInstance(): Keycloak {
  return new Keycloak(keycloakConfig);
}

/**
 * Creates a new instance of the Keycloak service.
 *
 * @param {boolean} isKeycloakEnabled - Indicates whether Keycloak should be used or not.
 * @param {UseAuthStoreReturnType} authStore - The user store to use.
 * @returns {KeycloakInterface} The Keycloak service instance.
 */
export function serviceFactory(
  isKeycloakEnabled: boolean,
  authStore: UseAuthStoreReturnType,
): KeycloakInterface {
  // Singleton instance
  if (keycloakInstance === null) {
    keycloakInstance = isKeycloakEnabled
      ? new Service(createKeycloakInstance(), authStore, refreshConfig)
      : new ServiceMock(authStore);
  }
  return keycloakInstance;
}
