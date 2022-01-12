import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../models/blog';
import { Author } from '../models/user';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blogedit',
  templateUrl: './blogedit.component.html',
  styleUrls: ['./blogedit.component.css']
})
export class BlogeditComponent implements OnInit {
  author = new Author();
  blog = new Blog();
  blogs: Blog[] = [];
  constructor(private _blogService: BlogService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this._blogService.getDetails(params.get('id')).subscribe(
        (Response: any) => {
          this.blog = Response;
        },
        (error) => { console.log(error) }
      )
    })
  }
  update() {
    this._blogService.update(this.blog._id, this.blog).subscribe(
      (Response: any) => {
        alert('Your post Updated succseefuly !');
        this._router.navigateByUrl('/home');
      },
      (error) => { console.log(error) }
    )

  }
}
