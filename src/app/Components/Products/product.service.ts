import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants ,Apis} from 'src/app/Global/Global';
import { Product } from 'src/app/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL = Constants.APIURL;
  constructor(private http:HttpClient) { }
  //#region  Get All Products
  getAllProducts(pageNo:number,pageLimit:number):Observable<Product>{
    return this.http.get<Product>(this.baseURL+Apis.Products.getAllProduct+`?page=${pageNo}&limit=${pageLimit}`);
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(this.baseURL+Apis.Products.getProductById+`${id}`)
  }
  //#endregion
}
