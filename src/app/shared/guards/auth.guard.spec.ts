import {TestBed} from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {RouterTestingModule} from "@angular/router/testing";



fdescribe('AuthGuard', () => {
  let guard: AuthGuard;
  let routeMock: any = { data: {roles : []}};
  let routeStateMock: any = { snapshot: {}, url: '/account'};
  let service: KeycloakService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, RouterTestingModule, KeycloakAngularModule],
      providers: [AuthGuard, KeycloakService],
    })
  })

  beforeEach( () => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
    service = TestBed.get(KeycloakService)
  });

  it('should be created' ,() =>{
    expect(guard).toBeTruthy();
  })

  it('should allow the authenticated user to access app', () => {
    spyOn(service, 'login').and.returnValue({redirectUri: window.location.origin + routeStateMock.url} as any);
    expect( guard.isAccessAllowed(routeMock, routeStateMock)).toBe(true)
  })
});
