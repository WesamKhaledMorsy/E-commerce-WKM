import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis, Constants } from 'src/app/Global/Global';
import { Brands } from 'src/app/Models/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseURL = Constants.APIURL;
  constructor(private http:HttpClient) { }

  //#region Brands
  getALlBrands(pageNo:number,pageLimit:number):Observable<Brands>{
    return this.http.get<Brands>(this.baseURL+Apis.Brands.brands+`?page=${pageNo}&limit=${pageLimit}`);
  }
  getBrandsById(BrandId:string):Observable<Brands>{
    return this.http.get<Brands>(this.baseURL+Apis.Brands.brands+BrandId);
  }
  //#endregion
}
