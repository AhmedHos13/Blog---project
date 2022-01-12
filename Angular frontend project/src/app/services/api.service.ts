import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token') || ''
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'token': this.getToken()
    })
  }

  get(url: string) {
    return this._http.get(url, { headers: this.getHeaders() })
  }
  post(url: string, body: any) {
    return this._http.post(url, body, { headers: this.getHeaders() })
  }
  update(url: string, body: any) {
    return this._http.patch(url, body, { headers: this.getHeaders() })
  }
  delete(url: string) {
    return this._http.delete(url, { headers: this.getHeaders() });
  }
  // `${environment.apiURL}
}
