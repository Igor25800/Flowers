import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../shared/services/user/user.service";
import {IUser} from "../../shared/interfaces/user.interface";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {Address} from "ngx-google-places-autocomplete/objects/address";

@Component({
  selector: 'app-root',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss']
})
export class AccountComponent implements OnInit{

  accountForm!: FormGroup;
  submitted!: boolean;
  position =  {lat: 53.90650967012304, lng: 27.52991802527217};
  height = '396px';
  options!: any;
  location = true;
  @ViewChild('addressInput') addressInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private keyCloakServices: KeycloakService,
    private userServices: UserService,
    private toaster: ToastrService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.getForm();
    this.getUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '50%',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getForm(): void {
    this.accountForm = this.fb.group({
      fullName: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{1,10} [a-zA-Z]{1,10}')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      homeAddress: ['', [Validators.required]],
      information: [''],
    })
  }

  getUser(): void {
    this.userServices.getUser().subscribe((user: IUser) => {
      const fullName = `${user.firstName} ${user.lastName}`
        this.accountForm.patchValue({...user, fullName: fullName})
    })
  }

  exit(): void {
    this.keyCloakServices.logout(`${window.location.origin}/registration`);
  }

  saveUserInfo(): void {
    this.submitted = true;
    if(this.accountForm.valid) {
      const {fullName,email, phone, homeAddress } = this.accountForm.value
      const [firstName, lastName] = fullName.split(" ");
      const user = {email, firstName, lastName, phone, homeAddress }
      this.userServices.updateUser(user).subscribe(() => {
          this.toaster.success('Update User')
      }, error => {
        this.toaster.error('problems')
      })
    }
  }

  validatorControl(name: string): FormControl {
    return this.accountForm.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }

  public handleAddressChange(address: Address) {
    this.accountForm.patchValue({homeAddress: this.addressInput.nativeElement.value});
    this.position  = {lat: address.geometry.location.lat(), lng: address.geometry.location.lng()}
  }

  eventMaps(maps: any): void {
    const [one] = maps.results;
    this.accountForm.patchValue({homeAddress: one.formatted_address})
  }
}
