import Keycloak from "keycloak-js";
import {keycloakJsConfig, serviceConfig} from "./config";
import type {KeycloakService} from "./types";
import type {UserStoreReturnType} from "./user";
import {ServiceMock} from "./service-mock";
import {Service} from "./service";

let s : KeycloakService | null = null;

export function createKeycloakInstance(): Keycloak {
    return new Keycloak(keycloakJsConfig)
}

export function serviceFactory(enableKeycloak : boolean, userStore: UserStoreReturnType): KeycloakService {
    if(s === null){
        if(enableKeycloak){
            s = new Service(createKeycloakInstance(), userStore, serviceConfig)
        } else {
            s = new ServiceMock(userStore)
        }
    }
    return s
}