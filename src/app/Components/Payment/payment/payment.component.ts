import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../Cart/cart.service';
import { ShippingAddress } from 'src/app/Models/ShippingAddress';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cartID:string|null ='';
  redirctUrlAfterPayment  : string='/allorders' ;
  paymentOpen :boolean =false;
  orderForm :FormGroup = new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl('')
  })
  constructor(private _ActivatedRoute:ActivatedRoute,private _CartS:CartService, private router:Router){}
  ngOnInit(): void {
    // Get cartID from url
    this._ActivatedRoute.paramMap.subscribe({
      next:(param:any)=>{
        this.cartID = param.get('cartId');
        console.log(this.cartID);
      }
    })
  }
  handlePayment():void{
    const orderData= this.orderForm.value;
    this._CartS.checkOut(this.cartID ,orderData).subscribe({
      next:(response:any)=>{
        if(response.status === 'success'){
          // _self to open in the same tap
          response.session.success_url = '/allorders';
          window.open(response.session.url , '_self')

        }
        console.log(response);

      }
    })

  }
}
