import { Product } from './../../../Models/product';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/Models/cart';
import { WishListService } from '../../WishList/wish-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
   _ActivatedRoute = inject(ActivatedRoute);
   productDetails :any ;
   wishListData :string []=[];

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 800,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(private _productS:ProductService ,
    private _wishlist:WishListService,
    private _cartS:CartService,
    private toastr: ToastrService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((data:any)=>{
      if(data.get('id')){
          this.getProductByID(data.get('id'));
      }
    })
    this._wishlist.getAllProductsOfUser().subscribe({
      next:(response:any)=>{
        const newData = response.data.map((item:any)=>item._id);
        this.wishListData=newData;
      }
    })
  }

  getProductByID(id:string){
    this._productS.getProductById(id).subscribe({
      next:(res:any)=>{
        this.productDetails = res.data;
      },error: (err)=>{
        console.log(err);

      },
    })
  }
  addToCart(productId:string){
    this._cartS.addProductToCart(productId).subscribe({
      next:(res:Cart)=>{
        if(res.status === 'success'){
          this.toastr.success(`${res.message}`, '', {
            timeOut: 3000,
          });
          this._cartS.totalNumofCartItems.next(res.numOfCartItems)
        }
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
  addFavourite( productId:string){
    this._wishlist.addProductToWishList(productId).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          this.toastr.success(`${response.message}`);
          this.wishListData=response.data;
        }
        this._wishlist.wishCount.next(response.data.length);
      }
    })
  }
  removeFavourite(productId:string){
    this._wishlist.removeProductFromWishList(productId).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          this.toastr.info(`${response.message}`);
          this.wishListData=response.data;
        }
        this._wishlist.wishCount.next(response.data.length);
      }
    })
  }
}
