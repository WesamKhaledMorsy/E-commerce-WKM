import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants ,Apis} from 'src/app/Global/Global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = Constants.APIURL;

  constructor(private http:HttpClient) { }
  //#region  Forget Password
  forgetPassword(useremail:object):Observable<any>{
    return this.http.post<any>(this.baseURL+Apis.User.forgetPass,useremail);
  }
  resetCode(reset_code:object):Observable<any>{
    return this.http.post(this.baseURL+Apis.User.resetCode,reset_code);
  }
  resetPassword(reset_password:object):Observable<any>{
    return  this.http.put(this.baseURL+Apis.User.resetPassword,reset_password );
  }
  //#endregion
}
