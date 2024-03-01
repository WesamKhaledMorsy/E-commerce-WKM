import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    token = `${localStorage.getItem('token')}`
    constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   //to add headers to any request ==> take a copy from the request and set the headers in it by 'clone'
   // and the new verison of request continue the chain
    const updatedRequest = request.clone({
      headers:request.headers.set('token',this.token)
    })

    return next.handle(updatedRequest);
  }
}
