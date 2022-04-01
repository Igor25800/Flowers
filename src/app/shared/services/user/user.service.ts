import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {IUser} from "../../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`users/registration`, user, {
      responseType: 'text' as 'json',
    })
  }

  resetPasswordUser(email: string): Observable<string> {
    return this.http.post<string>(`users/reset_password`, email , {
      responseType: 'text' as 'json',
    })
  }

  getUser(): Observable<IUser>{
    return  this.http.get<IUser>('users/user')
  }

  updateUser(user: IUser): Observable<IUser> {
    return  this.http.patch<IUser>('users', user, {
      responseType: 'text' as 'json',
    })
  }

  changePassword(password: {oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.post('users/change_password', password, {
      responseType: 'text' as 'json',
    })
  }
}
