import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../LoginRegister/auth.service';
import { User } from 'src/app/Models/user';
import { Router } from '@angular/router';
import { CartService } from '../../Cart/cart.service';
import { BehaviorSubject } from 'rxjs';
import { WishList } from 'src/app/Models/wishlist';
import { WishListService } from '../../WishList/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin :boolean = false;
  numOfItems=0;
  _count =0;
    constructor(private _authS:AuthService,private router:Router,
      private _cartS:CartService,
      private _wishList:WishListService){}
  ngOnInit(): void {
    this._cartS.totalNumofCartItems.subscribe({
      next:(response)=>{
        this.numOfItems=response;
      }
    })
    this._wishList.wishCount.subscribe((value) => {
      console.log('====================================');
      console.log(value);
      this._count=value
      console.log('====================================');
    });
    this.isLoginFn()
  }
  isLoginFn(){
    this._authS.user_data.subscribe((data:User)=>{
      //! this._authS.user_data.getValue() === null OR data ===null
      let token = localStorage.getItem('token');
      if(data=== null && token == null ){
        this.isLogin=false;
      }else{
        this.isLogin=true;
      }

    });
  }

    logOutFn(){
      this._authS.logOut();
    }

}
