import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminRouteService {
  readonly ROOT_URL = `${environment.PORT_URL}/admin`;

  constructor(private http: HttpClient) {}

  post(url: any, payload): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }
}
