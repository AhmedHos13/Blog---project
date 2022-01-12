import { UserService } from './../services/user.service';
import { Author } from './../models/user';
import { Blog } from './../models/blog';
import { BlogService } from './../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  p: any;
  blogs: Blog[] = [];
  isPageLoaded: boolean = false;
  user = new Author();
  constructor(private _blogService: BlogService, private _userService: UserService, private _router: Router) { }
  isloggedIn = this._userService.isLoggedIn()

  ngOnInit(): void {
    this._blogService.get().subscribe(
      (Response: any) => {
        this.blogs = Response.data;
        // console.log(this.blogs)
        this.isPageLoaded = true;
        this.parseJwt();
      },
      (error) => { console.log(error) }
    )
  }
  remove(index: number) {
    let blog = this.blogs[index];
    // console.log(blog._id)
    blog.isBlogDeleted = true;
    this._blogService.delete(blog._id).subscribe(
      (Response: any) => {
        this.blogs.splice(index, 1);
      },
      (error) => { console.log(error) })
  }
  parseJwt() {
    const Token: any = localStorage.getItem('token')
    const base64Url = Token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payLoad = JSON.parse(jsonPayload)
    return payLoad.email
  };
}
