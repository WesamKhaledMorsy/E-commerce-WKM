import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ShippingAddress } from 'src/app/Models/ShippingAddress';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  loading:boolean=false;
  clicked:boolean =false;
  userAddresses:ShippingAddress[]=[];

  userDataForm:FormGroup = new FormGroup ({
    name:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(3)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
  });

  
  constructor(private _UserService:UserService,private toaster:ToastrService){}
  ngOnInit(): void {

  }


  handleUserDataForm(_userDataForm:FormGroup){
    console.log(_userDataForm.value);
    this.clicked=true;
    this.loading=true;
    if(this.userDataForm.invalid){
      this.loading=true;
      return;
    }

    this.loading=true;
    if(this.userDataForm.valid){
      this._UserService.updateUserData(_userDataForm.value).subscribe({
        next:(response:any)=>{
          this.loading=false;
          if(response.message === "success"){
            console.log(response.user);
            this.toaster.success('Your data is Updated Successfully','',{
              timeOut: 3000
            });
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
    this.userDataForm.reset();
    this.clicked=false;
  }
}
