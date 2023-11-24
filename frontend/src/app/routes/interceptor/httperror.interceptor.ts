import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttperrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let errorMsg = '';
          if (event.body.success === false) {
            if (
              event.body.statusCode === 499 ||
              event.body.statusCode === 498 ||
              event.body.statusCode === 401
            ) {
              this.router.navigate(['/admin/login']);
            }
            errorMsg = `Message: ${event.body.message}`;
            this.toastr.error(errorMsg);
          } else {
            return event;
          }
        }
      })
    );
  }

  //NOTE: we are not using this but I have kept it for future reference
  errorHandler(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      console.log('this is client side error');
      errorMsg = `Error: ${error.error.message}`;
    } else {
      if (
        error.status === 498 ||
        error.status === 499 ||
        error.status === 401
      ) {
        window.location.href = `${environment.BASE_URL}/admin/signin`;
      }
      errorMsg = `Error Code: ${error.status},  Message: ${error.error.message}`;
    }
    return this.toastr.error(errorMsg);
  }
}
