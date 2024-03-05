import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/Models/category';
import { CategoryService } from '../../Categories/category.service';

@Component({
  selector: 'app-mainslider',
  templateUrl: './mainslider.component.html',
  styleUrls: ['./mainslider.component.scss']
})
export class MainsliderComponent {
  categories: Category []=[];
  pageNumber : number = 1;
  pageLimit: number =40;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
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
    nav: false
  }
  constructor(private _CategoryS:CategoryService){}
  imagesGroup1:any = [
    {
      src: 'assets/images/main-slider-1.jpeg'
    },
    {
      src:'assets/images/main-slider-2.jpeg'
    },
    {
      src:'assets/images/main-slider-3.jpeg'
    }
  ]
  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory(){
    this._CategoryS.mainSlider  ().subscribe({
      next:(res:any)=>{
        if(res){
          this.categories =res.data;
        }
      }
    })
    }
}
