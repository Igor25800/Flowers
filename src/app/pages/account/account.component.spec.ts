import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {AccountComponent} from "./account.component";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../shared/services/user/user.service";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";



fdescribe('ContactsComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let service: UserService;
  let matDialog: MatDialogModule

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), MatDialogModule, BrowserAnimationsModule],
      providers: [UserService, ToastrService, KeycloakService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges()
  })

  it('should create ContactsComponent', () => {
    expect(component).toBeTruthy();
  })

  it('should getForm', () => {
    component.getForm();
    expect(component.accountForm.value).toEqual({fullName: '', email: '', phone: '', homeAddress: '', information: ''})
  });

  it('should  submitted true', () => {
    component.submitted = false;
    component.saveUserInfo();
    expect(component.submitted).toBe(true)
  });

  it('should getUser', () => {
    const user = {firstName: 'igor', lastName: 'fedor', home: 'home',email: 'name', homeAddress: 'lvov', information: 'text'} as any
    spyOn(service, 'getUser').and.returnValue(of(user));
    component.getUser();
    expect(component.accountForm.value).toEqual({email: "name", fullName: "igor fedor", homeAddress: "lvov", information: "text", phone: ""})
  });

  it('should validatorForm',  () => {
    component.accountForm.patchValue({fullName: 'igor fedor'})
    component.validatorForm('fullName')
    expect(component.accountForm.controls.fullName.status).toBe('VALID')
  });
})
