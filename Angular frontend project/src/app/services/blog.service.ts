import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _apiService: ApiService) { }
  get() {
    return this._apiService.get(`http://localhost:3000/blogs`);
  }
  post(blog: any) {
    return this._apiService.post(`http://localhost:3000/blogs/`, blog)
  }
  update(_id: any, blog: Blog) {
    return this._apiService.update(`http://localhost:3000/blogs/${_id}`, blog)
  }
  delete(_id: any) {
    return this._apiService.delete(`http://localhost:3000/blogs/${_id}`)
  }
  getDetails(_id: any | null) {
    return this._apiService.get(`http://localhost:3000/blogs/${_id}`)
  }
}
