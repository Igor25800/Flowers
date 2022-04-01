import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ChangePasswordComponent} from "./change-password.component";
import {UserService} from "../../../shared/services/user/user.service";

fdescribe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let service: UserService;
  let toster: ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [UserService, ToastrService]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges()
  })

  it('should create ContactsComponent', () => {
    expect(component).toBeTruthy();
  })

  it('should getForm', () => {
    component.getForm();
    expect(component.passwordChangeForm.value).toEqual({oldPassword: '', newPassword: ''})
  });

  it('should  submitted true', () => {
    component.submitted = false;
    component.changePassword();
    expect(component.submitted).toBe(true)
  });

  it('should validatorForm',  () => {
    component.passwordChangeForm.patchValue({oldPassword: 'igor'})
    component.validatorForm('oldPassword')
    expect(component.passwordChangeForm.controls.oldPassword.status).toBe('VALID')
  });
})
