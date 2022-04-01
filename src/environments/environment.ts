// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import {KeycloakConfig} from "keycloak-js";
import * as SockJS from "sockjs-client";

let keyClockConf: KeycloakConfig = {
  url: 'http://172.16.16.41:15003',
  realm: 'angular_trainee',
  clientId: 'angular_trainee_client',
}

export const environment = {
  production: false,
  back: 'http://172.16.16.41:15000',
  keyCloak: keyClockConf,
  img: 'http://172.16.16.41:15000/images/',
  sock: 'http://172.16.16.41:15000/ws',
  mapsApi: 'AIzaSyDKmK_ZSFQkIEcNMAIB_NlQ4oZcxHnDPPQ',
  stripe: 'pk_test_51JCHjNDOmUi0GX61HsV9ISkpXLZ0F0iAf9KjJhyhf3RlsdCf062Vf5jpOD4bUwrbnV246xpekRjSScfe8lPNV7eF00YKMa72sG'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
