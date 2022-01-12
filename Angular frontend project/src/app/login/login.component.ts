import { Router } from '@angular/router';
import { Author } from './../models/user';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isBeaingLogin: boolean = false;
  formLogin: FormGroup = new FormGroup({});
  users: Author[] = [];
  isValidUser: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _router: Router) { }
  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      Email: ['mail@example.com', [Validators.required]],
      Password: ['', [Validators.required]]
    })
  }

  login(email: string, password: string) {
    this.isBeaingLogin = true
    const user = new Author();
    user.email = email;
    user.password = password;
    this._userService.post({ email, password }).subscribe(
      (Response: any) => {
        if (!Response) {
          this.isValidUser = false;
          return;
        }
        localStorage.setItem('token', Response);
        this._userService.loginStatus.next(true);
        this._router.navigateByUrl('/home');
      },
      (error) => { console.log(error) }
    )
  }

  isValidEmail() {
    return !this.formLogin.controls['Email'].errors
  }
  isValidPassword() {
    return !this.formLogin.controls['Password'].errors
  }
  isRegistered(): boolean {
    return this._userService.isLoggedIn()
  }
}
