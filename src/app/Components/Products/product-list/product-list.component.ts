import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/Models/product';
import { Router } from '@angular/router';
import { SeemorePipe } from 'src/app/pipes/seemore.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Cart/cart.service';
import { Cart } from 'src/app/Models/cart';
import { WishListService } from '../../WishList/wish-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product []= [];
  term : string = "";
  pageNumber : number = 1;
  pageLimit: number =15;
  allProducts:number = 0;
  wishListData :string []=[];

   router = inject(Router)
  constructor(private productService:ProductService,
    private _wishlist:WishListService,
    private _cartS:CartService,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.GetAllProducts(this.pageNumber,this.pageLimit);
    this._wishlist.getAllProductsOfUser().subscribe({
      next:(response:any)=>{
        const newData = response.data.map((item:any)=>item._id);
        this.wishListData=newData;
      }
    })
  }
  GetAllProducts(pageNo:number,limit:number){
    this.productService.getAllProducts(pageNo,limit).subscribe({
      next:(res:any)=>{
        this.products = res.data;
        this.allProducts=res.results;
        this.pageNumber = res.metadata.currentPage;
        this.pageLimit =  res.metadata.limit;

      }, error:(erroeAngular)=>{
        console.log(erroeAngular);
      }
    })
  }
  pageChanged(event: any) {
    this.pageNumber=event;
    this.GetAllProducts(this.pageNumber,this.pageLimit);
  }
  getProductByID(id:string){
        this.router.navigate(['/product/product_details/' + id]);
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
        this._wishlist.wishCount.next(response.data.length) ;
      }
    })
  }
  removeFavourite(productId:string){
    this._wishlist.removeProductFromWishList(productId).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          this.toastr.info(`${response.message}`);
          this.wishListData=response.data;
          this._wishlist.wishCount.next(response.data.length);
        }
        this._wishlist.wishCount.next(response.data.length) ;
      }
    })
  }
}
