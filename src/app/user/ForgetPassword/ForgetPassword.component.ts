import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ForgetPassword',
  templateUrl: './ForgetPassword.component.html',
  styleUrls: ['./ForgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  step1 :boolean =true;
  step2 :boolean =false;
  step3 :boolean =false;
  clicked:boolean=false;
  email:string ='';

  forgetForm:FormGroup =new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })
  resetCodeForm:FormGroup =new FormGroup({
    resetCode:new FormControl('',[Validators.required])
  })
  ResetPasswordForm:FormGroup =new FormGroup({
    newPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])
  })
  constructor(private _UserServices: UserService, private toastr: ToastrService,
    private router:Router){}
  ngOnInit(): void {

  }

  handleForgetPassword(){
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    console.log(userEmail);

    this._UserServices.forgetPassword(userEmail).subscribe({
      next:(response:any)=>{
        console.log(response);
        if(response.statusMsg==='success'){
          this.toastr.success(`${response.message}`, '', {
            timeOut: 3000,
          });
          this.step1=false;
          this.step2=true;
        }
      },error:(err)=>{
        console.log(err);
        this.toastr.error(`${err.error.message}`, '', {
          timeOut: 3000,
        });
      }
    })
  }
  handleResetCode(){
    let resetcode = this.resetCodeForm.value;
    this._UserServices.resetCode(resetcode).subscribe({
      next:(response:any)=>{
        this.step1=false;
        this.step2=false;
        this.step3=true;
        this.toastr.success(`${response.status}`, '', {
          timeOut: 3000,
        });
        console.log(response);

      },error:(err)=>{
        console.log(err);
        this.toastr.error(`${err.error.message}`, '', {
          timeOut: 3000,
        });
      }
    })
  }
  handleResetPassword(){
    this.clicked=true;
    let resetForm = this.ResetPasswordForm.value;
    resetForm.email = this.email;

    this._UserServices.resetPassword(resetForm).subscribe({
      next:(response:any)=>{
        if(response.token){
          localStorage.setItem('token',response.token);
          this.router.navigate(['/home']);
          this.toastr.success('Password Changed Successfully', '', {
            timeOut: 3000,
          });
        }
        console.log(response);

      },error:(err)=>{
        console.log(err);
        this.toastr.error(`${err.error.message}`, '', {
          timeOut: 3000,
        });
      }
    })
  }
}
