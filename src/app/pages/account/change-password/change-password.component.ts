import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../account.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordChangeForm!: FormGroup;
  submitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private userServices: UserService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getForm();
  }

  getForm(): void {
    this.passwordChangeForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    })
  }

  changePassword(): void {
    this.submitted = true
    if(this.passwordChangeForm.valid) {
      this.userServices.changePassword(this.passwordChangeForm.value).subscribe(() => {
        this.toaster.success('password success')
      }, error => {
        this.submitted = true
        this.toaster.error(error.error)
      })
    }
  }

  validatorControl(name: string): FormControl {
    return this.passwordChangeForm.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }
}
