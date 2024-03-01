import { Apis, Constants } from './../../Global/Global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL = Constants.APIURL;
  constructor(private http:HttpClient) { }

  //#region category
  getALlCatgories(pageNo:number,pageLimit:number):Observable<Category>{
    return this.http.get<Category>(this.baseURL+Apis.Category.getAllCategories+`?page=${pageNo}&limit=${pageLimit}`);
  }
  mainSlider():Observable<any>{
    return this.http.get<Category>(this.baseURL+Apis.Category.getAllCategories);
  }
  getCatgoryById(categoryId:string):Observable<Category>{
    return this.http.get<Category>(this.baseURL+Apis.Category.getAllCategories+categoryId);
  }
  //#endregion
}
