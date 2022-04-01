import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ContactsComponent} from "./contacts.component";
import {ContactsService} from "../../shared/services/contacts/contacts.service";
import {Contact} from "../../shared/models/contact.model";
import {IContact} from "../../shared/interfaces/contact.interface";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";

fdescribe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let service: any;
  let toster: ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), GooglePlaceModule],
      providers: [ContactsService, ToastrService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ContactsService);
    fixture.detectChanges()
  })

  it('should create ContactsComponent', () => {
    expect(component).toBeTruthy();
  })

  it('should OnInit Form',  () => {
    component.ngOnInit();
    expect(component.contactForms).toBeTruthy();
    expect(component.contactForms.value).toEqual({name: '', phone: '', text: ''});
  });

  it('should, should set submitted to true', () => {
    component.addContacts();
    expect(component.submitted).toBe(true);
  });

  it('should, should set submitted to false', () => {
    component.addContacts();
    component.contactForms.patchValue({
      name: 'Igor',
      phone: '22222222222',
      text: 'super text'
    });

    const contact = new Contact('Igor', 'phone', 'text');
    (component as any).contactsService.addContacts(contact).subscribe((res: IContact) => {
      expect(res).toEqual({name: 'Igor' , phone: 'phone', text: 'text'});
      expect(component.submitted).toBe(false);
      component.contactForms.reset();
      toster.success('Success')
    })
  });
})
