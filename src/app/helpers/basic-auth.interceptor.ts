import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { STORAGE_KEY } from '../CONFIG';
import { User } from '../models/profile';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  currentUser: User;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    this.currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY));
    !this.currentUser
      ? (this.currentUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY)))
      : '';
    if (this.currentUser && this.currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${this.currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
