import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { WishList, WishListData } from 'src/app/Models/wishlist';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Products/product.service';
import { CartService } from '../../Cart/cart.service';
import { Router, RouterModule } from '@angular/router';
import { Cart } from 'src/app/Models/cart';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../../LoginRegister/auth.service';
import { SeeMoreInWishListPipe } from 'src/app/pipes/see-more-in-wish-list.pipe';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  standalone: true,
  imports:[CommonModule,RouterModule,SeeMoreInWishListPipe]
})
export class WishListComponent implements OnInit, AfterViewInit{
   wishList:WishList[] = [];
   products:WishListData []=[];
   userId:string|null ='';
   _count = new BehaviorSubject<number>(0);
  constructor(private _wishlist:WishListService,
    private _cartS:CartService,private router :Router,
    private toastr: ToastrService,private _AuthService:AuthService) {}

  ngOnInit(): void {
    this._AuthService.user_data.subscribe((res:any) =>{
      this.userId=res.id;
    })
  }
ngAfterViewInit(): void {
  this.getAllWishProductsOfUser();
}
  getAllWishProductsOfUser(){
    this._wishlist.getAllProductsOfUser().subscribe({
      next:(response :WishList)=>{
        if(response.data){
          this.products = response.data;
          this._count.next(response.count) ;
        }
      }
    })
  }
  getProductByID(id:string){
    this.router.navigate(['/product/product_details/' + id]);
  }
  addToCart(productId:string){
    console.log(productId);
  this._cartS.addProductToCart(productId).subscribe({
    next:(res:Cart)=>{
      if(res.status === 'success'){
        this.toastr.success(`${res.message}`);
        console.log(res.data);
      }
      this._cartS.totalNumofCartItems.next(res.numOfCartItems)
    },
    error:(error:any)=>{
      console.log(error);
    }
  })
  }
  removeFavourite(productId:string){
    this._wishlist.removeProductFromWishList(productId).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          this.wishList =response.data;
          this._wishlist.wishCount.next(response.data.length) ;
          this.toastr.info(`${response.message}`);
          // first Solution
          // this.getAllWishProductsOfUser();

          // Second Solution without calling api again
          const newProductsData= this.products.filter((item:any)=>this.wishList.includes(item._id));
          this.products = newProductsData;

        }
      }
    })
  }
}
