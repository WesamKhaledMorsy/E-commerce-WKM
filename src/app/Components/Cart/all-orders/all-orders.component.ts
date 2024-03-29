import { AuthService } from './../../LoginRegister/auth.service';
import { Product } from 'src/app/Models/product';
import {  Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { BehaviorSubject, retry } from 'rxjs';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class AllOrdersComponent implements OnInit {
  userId:string|null ='';
  orders:any[]=[];
  gitBaseUrl ="https://wesamkhaledmorsy.github.io/E-commerce-WKM/"
  localBaseUrl = "http://localhost:4200"

  constructor(private _ActivatedRoute:ActivatedRoute,
    private _CartS:CartService,private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.user_data.subscribe((res:any) =>{
      this.userId=res.id;
    })

    this.allUserOrders();
  }


  allUserOrders(){
    this._CartS.AllUserOrders(this.userId).subscribe({
      next:(response)=>{
        this.orders = response;
      },error:(err)=>{
        console.log(err);
        return;
      }
    })
  }
}
