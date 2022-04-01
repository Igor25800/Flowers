import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RegistrationComponent} from "./registration.component";
import {UserService} from "../../shared/services/user/user.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {ModalResetPasswordComponent} from "./modalResetPassword/modal-reset-password.component";
import {of} from "rxjs";
import {User} from "../../shared/models/user.model";
import {MapsComponent} from "../../components/maps/maps.component";


fdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let service: any;
  let dialog: MatDialog;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent, MapsComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), MatDialogModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [UserService, ToastrService],

    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should test OnInit getForms', () => {
    component.ngOnInit();
    expect(component.registrationForms).toBeTruthy();
    expect(component.registrationForms.value.email).toBe('');

    component.registrationForms.patchValue({email: 'test@mail.com'})
    expect(component.registrationForms.value.email).toBe('test@mail.com');
  })

  it('should, should set submitted to false', () => {
    component.registration();
    expect(component.submitted).toBe(true)
  });

  it('should should set submitted to true', () => {
    const spy = spyOn(service, 'addUser').and.returnValue(of({}));
    component.ngOnInit();
    component.registrationForms.patchValue({
      fullName: 'igor fedor',
      email: 'eee@mail.com',
      phone: '123123123',
      homeAddress: 'eee@mail.com',
      password: 'igor2580',
      confirmPassword: 'igor2580',
      stan: true,
    });
    const [firstName, lastName] = component.registrationForms.value.fullName.split(" ");
    expect(firstName).toBe('igor');
    expect(lastName).toBe('fedor');
    const user = new User('eee@mail.com', firstName, 'eee@mail.com', lastName, 'igor2580', '', '123123123');
    component.registration();
    expect(component.submitted).toBe(false);
    expect(component.registrationForms.value.email).toBe(null);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(user);
    const group = component.validatorPassword('email', 'email');
    group(component.registrationForms);
  });

  it('should call openDialog', () => {
    component.openDialog()
    const config = {
      width: '50%',
      data: ''
    }

    expect(config).toEqual({width: '50%', data: ''})
    dialog.open(ModalResetPasswordComponent, config)
  })

  it('should handleAddressChange', () => {
    const obj = {
      geometry: {
        location: {
          lat: function lat() {
            return 123333
          },
          lng: function lng() {
            return 2222
          }
        }
      }
    } as any;
    component.handleAddressChange(obj);
    expect(component.position).toEqual({lat: 123333, lng: 2222})
  });

  it('should eventMaps', () => {
    const array = {results: [{formatted_address: 'lvov'}, {formatted_address: 'kiev'}]};
    component.eventMaps(array);
    expect(component.registrationForms.value.homeAddress).toBe('lvov')
  });
})

