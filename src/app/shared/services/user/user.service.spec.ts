import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {UserService} from "./user.service";


fdescribe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should addUser',  () => {
    const user = {id: 1, name: 'igor'} as any;
      service.addUser(user).subscribe(user => {
        expect(user).toBeTruthy();
      });
    const req = httpTestingController.expectOne(`users/registration`)
    expect(req.request.method).toEqual("POST")
    req.flush(user)
  });

  it('should resetPasswordUser', function () {
    const email = 'igor@mail.ru';
    service.resetPasswordUser(email).subscribe(user => {
      expect(user).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`users/reset_password`)
    expect(req.request.method).toEqual("POST")
    req.flush(email)
  });

  it('should getUser',  () => {
    service.getUser().subscribe(user => {
      expect(user).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`users/user`)
    expect(req.request.method).toEqual("GET")
  });

  it('should updateUser',  () => {
    const user = {id: 1, name: 'igor'} as any;
    service.updateUser(user).subscribe(user => {
      expect(user).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`users`)
    expect(req.request.method).toEqual("PATCH")
    req.flush(user)
  });

  it('should changePassword',  () => {
    const password = {oldPassword: '1111', newPassword: '1111' };
    service.changePassword(password).subscribe(user => {
      expect(user).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`users/change_password`)
    expect(req.request.method).toEqual("POST")
    req.flush(password)

  });
})
