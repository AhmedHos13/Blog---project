import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../models/user';
import { find } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({});
  constructor(private _formBuilder: FormBuilder, private _userService: UserService , private _router:Router) { }

  users: Author[] = [];

  ngOnInit(): void {
    this.formRegister = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      Username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  register(firstName: string, lastName: string, username: string, email: string, password: string) {
    const user = new Author();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = password;
    this._userService.register(user).subscribe(
      (Response) => {
        console.log(this.users)
        this.users.push(user);
        this._router.navigateByUrl('/login')

      },
      (error) => { console.log(error) }
    )
  }
  isValidEmail() {
    return !this.formRegister.controls['Email'].errors
  }
  isValidPassword() {
    return !this.formRegister.controls['Password'].errors
  }
  isValidUsername() {
    return !this.formRegister.controls['Username'].errors

  }
}