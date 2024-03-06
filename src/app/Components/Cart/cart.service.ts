import { Product } from './../../Models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, count, retry } from 'rxjs';
import { Apis, Constants } from 'src/app/Global/Global';
import { ShippingAddress } from 'src/app/Models/ShippingAddress';
import { Cart } from 'src/app/Models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = '';
  baseURL = Constants.APIURL;
  totalNumofCartItems = new BehaviorSubject(0);
  constructor(private http:HttpClient) {
    this.url = window.location.origin;
    this.getAllUserProduct().subscribe({
      next:(response)=>{
        this.totalNumofCartItems.next(response.numOfCartItems);
      },error:(err)=>{
        console.log(err);
        this.totalNumofCartItems.next(0);
      }
    });
  }
  //#region cart
  addProductToCart(ProductId:string):Observable<any>{
    return this.http.post<any>( this.baseURL+Apis.Cart.Cart,{
        'productId':ProductId
      }
    )
    }
    getAllUserProduct():Observable<any>{
      return this.http.get(this.baseURL+Apis.Cart.Cart);
    }
    deleteItemFromCart(ProductId:string):Observable<any>{
      return this.http.delete(this.baseURL+Apis.Cart.Cart+`${ProductId}`)
    }
    updatePrductCount(ProductId:string,count:number):Observable<any>{
      return this.http.put(this.baseURL+Apis.Cart.Cart+`${ProductId}`,{
        count:count
      })
    }
    deleteUserCart():Observable<any>{
      return this.http.delete(this.baseURL+Apis.Cart.Cart)
    }
  //#endregion
  //#region  payment
//   href
// :
// window.location.href
// origin
// :
// "http://localhost:4200"
// pathname
// :
// "/allorders"
    checkOut(cartId:string|null,userInfo:ShippingAddress):Observable<any>{

      if(this.url ==='https://wesamkhaledmorsy.github.io'){
        this.url = 'https://wesamkhaledmorsy.github.io/E-commerce-WKM/'
      }else{
        this.url = 'http://localhost:4200';
        console.log(this.url);
      }
      return this.http.post<any>(this.baseURL+Apis.Payment.pay+cartId+'?url='+`${this.url}`,{
        shippingAddress:userInfo
      });
    }
  //#endregion
  //#region  UserOrders
    AllOrders():Observable<any>{
      return this.http.get(this.baseURL+Apis.Orders.getUserOrders);
    }
    AllUserOrders(userID:string|null):Observable<any>{
      return this.http.get(this.baseURL+Apis.Orders.getUserOrdersByUserId+userID);
    }
  //#endregion
}
