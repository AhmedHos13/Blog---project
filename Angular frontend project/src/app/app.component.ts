import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged = false
  constructor(private _userService: UserService) { }
  ngOnInit(): void {
    // this.isLogged = this._userService.isLoggedIn()
    this._userService.loginStatus.subscribe(status => { this.isLogged = status });
  }
  title = 'blog-project';
}
