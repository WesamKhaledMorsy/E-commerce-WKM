import { Component } from '@angular/core';
import { Brands } from 'src/app/Models/brands';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brands: Brands []=[];
  pageNumber : number = 1;
  pageLimit: number =15;
  allBrands:number = 0;
  constructor(private _BrandService:BrandService){}

  ngOnInit(): void {
    this.getAllBrand(this.pageNumber,this.pageLimit);
  }
  getAllBrand(pageNo:number,limit:number){
    this._BrandService.getALlBrands(pageNo,limit).subscribe({
      next:(res:any)=>{
        if(res){
          this.brands =res.data;
          this.pageNumber = res.metadata.currentPage;
          this.pageLimit =  res.metadata.limit;
        }
      }
    })
    }
    pageChanged(event: any) {
      this.pageNumber=event;
      this.getAllBrand(this.pageNumber,this.pageLimit);
    }
}
