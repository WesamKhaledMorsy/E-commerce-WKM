import { Cart } from './../../../Models/cart';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/Models/product';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../LoginRegister/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,AfterViewInit{
  userId:string|null ='';
  orders:any[]=[];
  userCart: any;
  userProducts: any[] = [];
  totalNumofCartItems = new BehaviorSubject(0);
  constructor(private _CartS: CartService, private toastr: ToastrService,
    private _AuthService:AuthService,
    private router:Router) {
    // this.getAllProduct();
  }
  ngAfterViewInit(): void {
    this.getAllProduct();
  }
  ngOnInit(): void {
    this._AuthService.user_data.subscribe((res:any) =>{
      this.userId=res.id;
    })
  }
  getAllProduct() {
    this._CartS.getAllUserProduct().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.userCart = res;
          this.userProducts = res.data.products;
          this.totalNumofCartItems = res.numOfCartItems;
        }
      }
    })
  }
  removeItem(productId: string) {
    this._CartS.deleteItemFromCart(productId).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.toastr.info('Item Deleted', '', {
            timeOut: 3000,
          });
          this.userCart = res;
          this.userProducts = res.data.products;
          this.totalNumofCartItems = res.numOfCartItems;
          this._CartS.totalNumofCartItems.next(res.numOfCartItems);
        }
      }
    })
  }
  updateProductQuantity(productId: string, count: number) {
    if (count < 0) {
      count = 0;
    }
    else {
      this._CartS.updatePrductCount(productId, count).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.toastr.info('Item updated', '', {
              timeOut: 3000,
            });
            this.userCart = res;
            this.userProducts = res.data.products;
            this.totalNumofCartItems = res.numOfCartItems;
          }
        }
      })

    }

  }

  deleteCart() {
    this._CartS.deleteUserCart().subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          this.userCart.numOfCartItems = 0;
          this.toastr.error('Your cart is Empty now', '', {
            timeOut: 3000,
          });
          this.userCart.numOfCartItems = 0;
          this.userProducts.length = 0;
          this.totalNumofCartItems = new BehaviorSubject(0);
          this._CartS.totalNumofCartItems.next(0);
        }
      }
    })
  }

  allUserOrders(){
    this._CartS.AllUserOrders(this.userId).subscribe({
      next:(response)=>{
        this.orders = response;
        this.router.navigate(['/allorders']);
      }
    })
  }
}

