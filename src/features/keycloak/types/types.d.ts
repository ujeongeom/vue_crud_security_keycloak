export interface KeycloakInterface {
  login(): Promise<void>;
  logout(): void;
}

export interface RefreshConfigInterface {
  refreshTokenMilliseconds: number;
}
