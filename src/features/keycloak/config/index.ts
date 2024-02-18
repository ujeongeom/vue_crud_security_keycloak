import { KeycloakConfig } from 'keycloak-js';
import { RefreshConfigInterface } from '../types/types';

export const keycloakConfig: KeycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL ?? '',
  realm: import.meta.env.VITE_KEYCLOAK_REALM ?? '',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? '',
};

export const refreshConfig: RefreshConfigInterface = {
  refreshTokenMilliseconds: import.meta.env.VITE_REFRESH_TOKEN_MS ?? 60000,
};

export const getEnableKeycloak = (): boolean => {
  const raw = import.meta.env.VITE_APP_KEYCLOAK_ENABLED;
  if (raw) {
    return JSON.parse(raw);
  }
  return false;
};
