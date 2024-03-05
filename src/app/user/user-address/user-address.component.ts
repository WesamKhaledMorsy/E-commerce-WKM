import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ShippingAddress } from 'src/app/Models/ShippingAddress';
import { User } from 'src/app/Models/user';
@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit{
  userAddresses:ShippingAddress[]=[];
  loading:boolean=false;
  clicked:boolean =false;
  @ViewChild('icon') Icon:any;
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  userAdressForm:FormGroup = new FormGroup ({
    name:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(3)]),
    details:new FormControl('',[Validators.required,Validators.minLength(3)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl('',[Validators.required,Validators.minLength(3)]),
  });
  constructor(private _UserService:UserService,private toaster:ToastrService){}
  ngOnInit(): void {
    this.getAllAddressesOfUser();
  }
  getAllAddressesOfUser(){
    this._UserService.getUserAddress().subscribe({
          next:(response:any)=>{
            console.log(response);
            this.userAddresses=response.data;
            console.log(this.userAddresses);
          }
        })
  }
  handleUserForm(_userAddressForm:FormGroup){
    console.log(_userAddressForm.value);
    this.clicked=true;
    this.loading=true;
    if(this.userAdressForm.invalid){
      this.loading=true;
      return;
    }

    this.loading=true;
    if(this.userAdressForm.valid){
      this._UserService.addUserAddress(_userAddressForm.value).subscribe({
        next:(response:any)=>{
          console.log(response);
          if(response.status ==="success"){
            this.toaster.success(`${response.message}`,'',{
              timeOut: 3000
            });
            console.log(response.data);
            this.userAddresses=response.data;
            this.loading=false;
            this.resetForm();
          }
        },error:(err:any)=>{
          console.log(err);
          this.toaster.error(`${err.error.errors.msg}`,'',{
            timeOut: 3000
          });
          this.loading=false;
        }
      })
    }
  }

  resetForm(){
    this.userAdressForm.reset();
    this.closeModal?.nativeElement.click();
  }
  deleteAddress(id:string){
    this._UserService.removeAddress(id).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.getAllAddressesOfUser()
      }
    })
  }
}
