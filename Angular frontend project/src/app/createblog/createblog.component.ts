import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Blog } from './../models/blog';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css']
})
export class CreateblogComponent implements OnInit {

  blogs: Blog[] = [];
  blog = new Blog();
  formCreate: FormGroup = new FormGroup({});

  constructor(private _blogService: BlogService, private _formBuilder: FormBuilder, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    if (!this._userService.isLoggedIn()) {
      this._router.navigateByUrl('/login')
    }
    this.formCreate = this._formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }
  add(title: string, content: string) {
    if (!(title && content)) {
      throw 'Enter a valid data!';
    }
    this.blog.title = title;
    this.blog.content = content;
    this.blog.isBlogAdded = true;
    this._blogService.post({ title, content }).subscribe(
      (Response: any) => {
        this.blogs.push(this.blog);
        this.blog.isBlogAdded = false;
        this._router.navigateByUrl('/home');
      },
      (error) => {
        console.log(error)
        console.log(this.blog)
      })
  }
}
