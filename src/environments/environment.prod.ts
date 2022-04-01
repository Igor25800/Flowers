import {KeycloakConfig} from "keycloak-js";

import * as SockJS from "sockjs-client";

let keyClockConf: KeycloakConfig = {
  url: 'http://172.16.16.41:15003',
  realm: 'angular_trainee',
  clientId: 'angular_trainee_client',
}


export const environment = {
  production: true,
  back: 'http://172.16.16.41:15000',
  keyCloak: keyClockConf,
  img: 'http://172.16.16.41:15000/images/',
  sock: 'http://172.16.16.41:15000/ws'
};




