import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-reset-password',
  templateUrl: 'modal-reset-password.component.html',
  styleUrls: ['../../../components/template/template.component.scss']
})
export class ModalResetPasswordComponent implements OnInit {

  emailForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getForm();
  }

  getForm(): void {
    this.emailForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]]
    })
  }

  resetPassword(): void {
    this.submitted = true;
    if (this.emailForm.valid) {
      this.userService.resetPasswordUser(this.emailForm.value).subscribe(() => {
        this.toastr.success('Reset Password');
        this.emailForm.reset();
        this.submitted = false;
      }, error => {
        this.toastr.error('Problems');
      })
    }
  }

  validatorControl(name: string): FormControl {
    return this.emailForm.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }
}
