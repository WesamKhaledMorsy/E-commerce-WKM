import { Category } from 'src/app/Models/category';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  categoryDetails :any;
  constructor(private _CategoryS:CategoryService, private _ActivatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((data:any)=>{
      if(data.get('id')){
          this.getCategoryByID(data.get('id'));
          console.log('====================================');
          console.log(data.get('id'));
          console.log('====================================');
      }
    })
  }
  getCategoryByID(id:string){
    this._CategoryS.getCatgoryById(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        if( res.data){
          this.categoryDetails = res.data;
        }
      },error: (err)=>{
        console.log(err);

      },
    })
  }
}
