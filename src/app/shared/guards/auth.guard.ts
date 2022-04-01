import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.authenticated) {
       this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    const requiredRoles = route.data.roles;
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}

