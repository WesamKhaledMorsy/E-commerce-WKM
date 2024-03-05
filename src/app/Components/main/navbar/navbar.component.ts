import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin :boolean = false;
  numOfItems=0;
  _count =0;
  /** to make event on scroll use 1)  @HostListener('window:scroll') onWindowScroll() {}
      // 2) @ViewChild('navBar') navBarElement!:ElementRef;
      //3) class Renderer2
      */
    constructor(private _authS:AuthService,private router:Router,
      private _cartS:CartService,
      private _wishList:WishListService,
      private _Renderer2:Renderer2){}
      @ViewChild('navBar') navBarElement!:ElementRef; // element
      @HostListener('window:scroll')
      onWindowScroll() {
        if(scrollY > 300){
          this._Renderer2.addClass(this.navBarElement.nativeElement,'px-5')
          this._Renderer2.addClass(this.navBarElement.nativeElement,'py-3')
          this._Renderer2.addClass(this.navBarElement.nativeElement,'shadow')
        }else{
          this._Renderer2.removeClass(this.navBarElement.nativeElement,'px-5')
          this._Renderer2.removeClass(this.navBarElement.nativeElement,'py-3')
          this._Renderer2.removeClass(this.navBarElement.nativeElement,'shadow')

        }
      }


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
