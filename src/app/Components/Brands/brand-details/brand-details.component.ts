import { Component } from '@angular/core';
import { BrandService } from '../brand.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent {
  brandDetails :any;
  constructor(private _brandS:BrandService, private _ActivatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((data:any)=>{
      if(data.get('id')){
          this.getbrandByID(data.get('id'));
          console.log('====================================');
          console.log(data.get('id'));
          console.log('====================================');
      }
    })
  }
  getbrandByID(id:string){
    this._brandS.getBrandsById(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        if( res.data){
          this.brandDetails = res.data;
        }
      },error: (err)=>{
        console.log(err);

      },
    })
  }
}
