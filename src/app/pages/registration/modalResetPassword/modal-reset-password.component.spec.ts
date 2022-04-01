import {RegistrationComponent} from "../registration.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {UserService} from "../../../shared/services/user/user.service";
import {ModalResetPasswordComponent} from "./modal-reset-password.component";


fdescribe('ModalResetPasswordComponent', () => {
  let component: ModalResetPasswordComponent;
  let fixture: ComponentFixture<ModalResetPasswordComponent>;
  let service: any;
  let toster: ToastrService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [UserService, ToastrService]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResetPasswordComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    toster = TestBed.get(ToastrService);
    fixture.detectChanges();
  })

  it('should create ModalResetPasswordComponent', () => {
    expect(component).toBeTruthy();
  })

  it('should test OnInit emailForms', () => {
    component.ngOnInit();
    expect(component.getForm).toBeTruthy();
    expect(component.emailForm.value.usernameOrEmail).toBe('');

    component.emailForm.patchValue({usernameOrEmail: 'test@mail.com'})
    expect(component.emailForm.value.usernameOrEmail).toBe('test@mail.com');
  })

  it('should submitted false', () => {
    expect(component.submitted).toBe(false);
  });

  it('should resetPassword', () => {
    component.resetPassword();
    expect(component.submitted).toBe(true);
    component.emailForm.patchValue({usernameOrEmail: 'eee@mail.com'});
    (component as any).userService.resetPasswordUser(component.emailForm.value).subscribe(() => {
      expect(component.submitted).toBe(false);
      component.emailForm.reset();
      expect(component.emailForm.get('usernameOrEmail')).toBe(null);
      expect(toster.success).toBe('Reset Password')
    })
  });
})
