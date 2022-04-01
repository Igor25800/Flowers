import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import {KeycloakService} from "keycloak-angular";
import {RouterTestingModule} from "@angular/router/testing";

fdescribe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let services: KeycloakService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DialogComponent],
      providers: [KeycloakService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    services = TestBed.get(KeycloakService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getName', fakeAsync(() => {
    const login = spyOn(services, 'isLoggedIn').and.resolveTo(true)
    const name = spyOn(services, 'getUsername').and.returnValue('igor')
    component.getName();
    expect(login).toHaveBeenCalled();
    tick();
    expect(name).toHaveBeenCalled();
    expect(component.name).toBe('igor')
  }));

  it('should url  true', () => {
      component.name = 'igor@mail.ru'
      expect(component.url).toBe('account')
    });

  it('should url  false', () => {
    component.name = ''
    expect(component.url).toBe('registration')
  });
});
