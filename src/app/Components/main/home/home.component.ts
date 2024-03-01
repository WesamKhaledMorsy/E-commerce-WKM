import { Component, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/Models/product';
import { ProductService } from '../../Products/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../Cart/cart.service';
import { Cart } from 'src/app/Models/cart';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../WishList/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pageNumber : number = 1;
  pageLimit: number =20;
  wishListData :string []=[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
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
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
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
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  imagesGroup1:any = [
    {
      src: 'assets/images/Jewelry_.jpg'
    },
    {
      src:'assets/images/61cSNgtEISL._AC_SY200_.jpg'
    },
    {
      src:'assets/images/41nN4nvKaAL._AC_SY200_.jpg'
    }
  ]
  imagesGroup2:any = [
    {
      src: 'assets/images/music.jpeg',
      title:'Music'
    },
    {
      src:'assets/images/menfashion.jpeg',
      title:'Men Fashion '
    },
    {
      src:'assets/images/womenfashion.jpeg',
      title:'Women Fashion'
    },
    {
      src:'assets/images/mobiles.png',
      title:'Mobiles'
    },
    {
      src:'assets/images/electronics.png',
      title:'Electronics'
    },
    {
      src:'assets/images/home.png',
      title:'Home'
    },
    {
      src:'assets/images/childrenbooks.png',
      title:'Children Books'
    },
    {
      src:'assets/images/beautyandhealth.png',
      title:'Beauty & Health'
    },
    {
      src:'assets/images/babyandtoy.png',
      title:'Baby & Toy'
    },
    {
      src:'assets/images/supermarket.png',
      title:'Super Market'
    }
  ]

  products:Product []= [];
  term : string = "";

   router = inject(Router)
  constructor(private productService:ProductService,
     private _cartS:CartService,
     private toastr: ToastrService,
     private _wishList:WishListService){}

  ngOnInit(): void {
    this.GetAllProducts();
    this._wishList.getAllProductsOfUser().subscribe({
      next:(response:any)=>{
        const newData = response.data.map((item:any)=>item._id);
        this.wishListData=newData;
      }
    })
  }
  GetAllProducts(){
    this.productService.getAllProducts(this.pageNumber,this.pageLimit).subscribe({
      next:(res:any)=>{
        this.products = res.data;
      }, error:(erroeAngular)=>{
        console.log(erroeAngular);
      }
    })
  }
  getProductByID(id:string){
        this.router.navigate(['/product/product_details/' + id]);
  }
  addToCart(productId:string){
    this._cartS.addProductToCart(productId).subscribe({
      next:(res:Cart)=>{
        if(res.status === 'success'){
          this.toastr.success(`${res.message}`);
        }
        this._cartS.totalNumofCartItems.next(res.numOfCartItems)
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
  addFavourite( productId:string){
    this._wishList.addProductToWishList(productId).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          this.wishListData= response.data;
          this.toastr.success(`${response.message}`);
        }
        this._wishList.wishCount.next(response.data.length) ;
      }
    })
  }
  removeFavourite(productId:string){
    this._wishList.removeProductFromWishList(productId).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          this.wishListData= response.data;
          this.toastr.error(`${response.message}`);
        }
        this._wishList.wishCount.next(response.data.length) ;
      }
    })
  }
}
