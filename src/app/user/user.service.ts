import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants ,Apis} from 'src/app/Global/Global';
import { User } from '../Models/user';
import { ShippingAddress } from '../Models/ShippingAddress';

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

  //#region  user address
  getUserAddress():Observable<ShippingAddress>{
    return this.http.get<ShippingAddress>(this.baseURL+Apis.Address.address)
  }
  addUserAddress(userAddress:any):Observable<ShippingAddress>{
    return this.http.post<ShippingAddress>(this.baseURL+Apis.Address.address,{    
        name: userAddress.name,
        details: userAddress.details,
        phone: userAddress.phone,
        city:userAddress.city    
    })
  }

  updateUserData(userData:any):Observable<any>{
    return this.http.put<any>(this.baseURL+Apis.User.UpdateLoggedUserData,{
      name: userData.name,
      email: userData.email,
      phone: userData.phone
    })
  }
  removeAddress(addressId:string):Observable<any>{
    return this.http.delete(this.baseURL+Apis.Address.address+`/${addressId}`);
  }
  //#endregion
}
