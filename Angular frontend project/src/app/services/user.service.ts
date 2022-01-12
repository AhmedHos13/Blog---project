import { Author } from './../models/user';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private _apiService: ApiService) {
  }
  register(user: Author) {
    return this._apiService.post(`http://localhost:3000/users/register`, user)
  }
  post(user: any) {
    return this._apiService.post(`http://localhost:3000/users/login`, user)
  }
  isLoggedIn(): boolean {
    let myToken = localStorage.getItem('token');
    return myToken != null;
  }
  logout() {
    localStorage.removeItem('token')
    this.loginStatus.next(false)
  }
}
