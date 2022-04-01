import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/user.model";
import {UserService} from "../../shared/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from '@angular/material/dialog';
import {ModalResetPasswordComponent} from "./modalResetPassword/modal-reset-password.component";
import {Address} from "ngx-google-places-autocomplete/objects/address";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['../../components/template/template.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForms!: FormGroup;
  submitted!: boolean;
  position =  {lat: 53.90650967012304, lng: 27.52991802527217};
  height = '396px';
  options!: any;
  location = true;
  @ViewChild('addressInput') addressInput!: ElementRef;



  constructor(
    private fb: FormBuilder,
    private userServices: UserService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getForm();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalResetPasswordComponent, {
      width: '50%',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getForm(): void {
    this.registrationForms = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,10} [a-zA-Z]{1,10}')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      homeAddress: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      information: [''],
      confirmPassword: ['', Validators.required],
      stan: [false, Validators.requiredTrue]
    },{validators: this.validatorPassword('password', 'confirmPassword')});
  }

  registration(): void {
    this.submitted = true;
    if (this.registrationForms.valid) {
      const {fullName, email, homeAddress, password, phone} = this.registrationForms.value;
      const [firstName, lastName] = fullName.split(" ");
      const user = new User(email, firstName, homeAddress, lastName, password, '', phone);
      this.userServices.addUser(user).subscribe(() => {
        this.registrationForms.reset();
        this.submitted = false;
          this.toaster.success('Success!');
      }, error => {
        this.toaster.error(error);
      })
    } else {
      this.toaster.error('incorrectly form!');
    }
  }

  validatorPassword(password: string, confirm: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const confirmPassword = formGroup.controls[confirm];
      if (confirmPassword.errors && !confirmPassword.errors.password) {
        return
      }
      if (control.value !== confirmPassword.value) {
        confirmPassword.setErrors({password: true})
      } else {
        confirmPassword.setErrors(null)
      }
    }
  }

  validatorControl(name: string): FormControl {
    return this.registrationForms.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }

  public handleAddressChange(address: Address) {
    this.registrationForms.patchValue({homeAddress: this.addressInput.nativeElement.value});
    this.position  = {lat: address.geometry.location.lat(), lng: address.geometry.location.lng()}
  }

  eventMaps(maps: any): void {
    const [one] = maps.results;
    this.registrationForms.patchValue({homeAddress: one.formatted_address})
  }


}
