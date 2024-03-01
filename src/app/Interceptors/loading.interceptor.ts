import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _NgxSpinnerService:NgxSpinnerService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Requests
    this._NgxSpinnerService.show();

    // return that is what returned from the backend
    // finalize take callback function
    /// any thing in finalize will be active when the request finished
    return next.handle(request).pipe(finalize(()=>{
      this._NgxSpinnerService.hide();
    }));
  }
}
