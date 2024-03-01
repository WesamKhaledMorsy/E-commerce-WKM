import { HttpClient } from '@angular/common/http';
import { Constants,Apis } from './../../Global/Global';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // newUser : User = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   rePassword: '',
  //   phone: '',
  //   token: ''
  // };
  // user_data :BehaviorSubject<User> =new BehaviorSubject<User>(this.newUser);
  user_data :any = new BehaviorSubject(null);
  constructor(private http:HttpClient,private router:Router) {
    this.decodeToken();
  }
  baseURL = Constants.APIURL;
  //#region decode  token
  decodeToken(){
    const token = localStorage.getItem('token');
    if(token){
      const decoded = jwtDecode(token);
      this.user_data.next(decoded)
    }else{
      return;
    }
  }
  //#endregion
  //#region SignUp
    signUp(userData:User):Observable<User>{
      return this.http.post<User>(this.baseURL+Apis.LoginRegister.signUp,userData).pipe(retry(2));
    }
  //#endregion

  //#region Login
  signIn(userData:User):Observable<User>{
    return this.http.post<User>(this.baseURL+Apis.LoginRegister.signIn,userData).pipe(retry(2));
  }
  //#endregion

  //#region Logout
  logOut(){
    localStorage.removeItem('token');
    this.user_data.next(null);
    this.router.navigate(['/login']);
  }
  //#endregion
}
