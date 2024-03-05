import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/app/Models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading:boolean=false;
  clicked:boolean =false;
  errorMessage:string='';
  SuccessfulMessage:string = '';


  SignInForm : FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  });


  constructor(private _authS:AuthService, private router:Router,private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.SignInForm;
  }
  handleSignIn(){
    this.clicked=true;
    this.loading=true;
    if(this.SignInForm.invalid){
      this.loading=true;
      return;
    }

    this.loading=true;
    if(this.SignInForm.valid){
      this._authS.signIn(this.SignInForm.value).subscribe({
        next:(data)=>{
          this.loading=false;
          if(data){
            this.errorMessage ='';
            this.SuccessfulMessage= "Sign Up successful";
            localStorage.setItem('token', data.token);
            this._authS.decodeToken();
            console.log(this._authS.decodeToken());

            this.router.navigate(['/home']);
            this.toastr.success('You logged in successfully');
          }
        },error:(errorAngular)=>{
          if(errorAngular.statusMsg==='fail'){
            this.errorMessage =errorAngular.error.message;
          }
          this.toastr.error('Email or password invalid','Major Error', {
            timeOut: 3000,
          });
          this.SuccessfulMessage="";
          this.loading=false;
        }
      })
      // this.loading=false;
    }
  }
}
