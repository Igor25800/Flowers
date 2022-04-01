import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactsService} from "../../shared/services/contacts/contacts.service";
import {Contact} from "../../shared/models/contact.model";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactForms!: FormGroup;
  submitted = false;
  position =  {lat:53.906409, lng: 27.530036};
  height = '268px'

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getForms()
  }

  getForms(): void {
    this.contactForms = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z]{0,10}")]],
      phone: ['', [Validators.required]],
      text: ['', Validators.required]
    })
  }

  addContacts(): void {
    this.submitted = true
    if (this.contactForms.valid) {
      const {name, phone, text} = this.contactForms.value;
      const contact = new Contact(name, phone, text);
      this.contactsService.addContacts(contact).subscribe(() => {
        this.toaster.success('Success!');
        this.contactForms.reset();
        this.submitted = false;
      }, error => {
        this.toaster.error('error');
      });
    } else {
      this.toaster.error('incorrectly form');
    }
  }

  validatorControl(name: string): FormControl {
    return this.contactForms.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }
}
