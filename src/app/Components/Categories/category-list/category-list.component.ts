import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/Models/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category []=[];
  pageNumber : number = 1;
  pageLimit: number =15;
  allCategories:number = 0;
  constructor(private _CategoryS:CategoryService){}
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getAllCategory(this.pageNumber,this.pageLimit);
  }
  getAllCategory(pageNo:number,limit:number){
    this._CategoryS.getALlCatgories(pageNo,limit).subscribe({
      next:(res:any)=>{
        if(res){
          this.categories =res.data;
          console.log(this.categories);
          this.pageNumber = res.metadata.currentPage;
          this.pageLimit =  res.metadata.limit;
        }
      }
    })
    }
    pageChanged(event: any) {
      this.pageNumber=event;
      this.getAllCategory(this.pageNumber,this.pageLimit);
      console.log(event);
    }
}
