import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CommonRouteService {
  readonly ROOT_URL = `${environment.PORT_URL}/api`;

  constructor(private http: HttpClient) {}

  get(url: any): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  post(url: any, payload): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  postPass(url: any, payload): Observable<any> {
    var user = localStorage.getItem('passToken');
    let headers = new HttpHeaders({
      Authorization: `${user}`,
    });
    return this.http.post(`${this.ROOT_URL}/${url}`, payload, {
      headers: headers,
    });
  }

  currencyConv(): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=USD`);
  }
}
