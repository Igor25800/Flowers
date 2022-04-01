import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../shared/services/user/user.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";
import {CartService} from "../../shared/services/cart/cart.service";
import {RouterTestingModule} from "@angular/router/testing";

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let services: KeycloakService;
  let carService: CartService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, KeycloakService, RouterModule, CartService, UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    services = TestBed.get(KeycloakService);
    carService = TestBed.get(CartService)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    component.close();
    expect(component.progress).toBe(0)
  });

  it('should toggle', () => {
    component.progress = 100
    component.toggle()
    expect(component.progress).toBe(0)
  });

  it('should eventExitDialog', () => {
    component.eventExitDialog(true)
    expect(component.isDialogToggle).toBe(true)
  });

  it('should eventRout', () => {
    component.eventRout('registration');
    expect(component.url).toBe('modal');
  });

  it('should isActivePage', () => {
    component.url = 'igor'
    expect(component.isActivePage('igor')).toBe(true)
  });

  it('should openDialog',  () => {
    component.openDialog();
    expect(component.url).toBe('modal');
    expect(component.isDialogToggle).toBe(true)

  });
});
