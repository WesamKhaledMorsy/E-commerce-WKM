import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apis, Constants } from 'src/app/Global/Global';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseURL = Constants.APIURL;
  wishCount = new BehaviorSubject(0);
  constructor(private http:HttpClient) {
    this.getAllProductsOfUser().subscribe({
      next:(response)=>{
        this.wishCount.next(response.count);
      },error:(err)=>{
        this.wishCount.next(0); 
      }
    })
  }
  //#region WishList
    addProductToWishList(_productId:string):Observable<any>{
      return this.http.post(this.baseURL + Apis.WishList.wish,{
        productId:_productId
      });
    }
    removeProductFromWishList(productId:string):Observable<any>{
      return this.http.delete(this.baseURL+Apis.WishList.wish+`${productId}`);
    }
    getAllProductsOfUser():Observable<any>{
      return this.http.get(this.baseURL+Apis.WishList.wish)
    }
  //#endregion
}
