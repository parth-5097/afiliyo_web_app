import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  private ROOT_URL = `${environment.PORT_URL}/username`;
  constructor(private http: HttpClient) {}

  get(url: any): Observable<any> {
    let user = JSON.parse(sessionStorage.getItem('adminUser'));
    let headers = new HttpHeaders({
      Authorization: `${user.loginToken}`,
    });
    return this.http.get(`${this.ROOT_URL}/${url}`, { headers: headers });
  }

  post(url: any, payload): Observable<any> {
    let user = JSON.parse(sessionStorage.getItem('adminUser'));
    let headers = new HttpHeaders({
      Authorization: `${user.loginToken}`,
    });
    return this.http.post(`${this.ROOT_URL}/${url}`, payload, {
      headers: headers,
    });
  }

  put(url: any, payload): Observable<any> {
    let user = JSON.parse(sessionStorage.getItem('adminUser'));
    let headers = new HttpHeaders({
      Authorization: `${user.loginToken}`,
    });
    return this.http.put(`${this.ROOT_URL}/${url}`, payload, {
      headers: headers,
    });
  }

  delete(url: any): Observable<any> {
    let user = JSON.parse(sessionStorage.getItem('adminUser'));
    let headers = new HttpHeaders({
      Authorization: `${user.loginToken}`,
    });
    return this.http.delete(`${this.ROOT_URL}/${url}`, {
      headers: headers,
    });
  }
}
