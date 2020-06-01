import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken}`,
      },
    });
    console.log('from interceptor');
    return next.handle(req);
  }
}
