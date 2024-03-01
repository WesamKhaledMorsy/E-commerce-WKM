import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { repasswordMatchPassord } from 'src/app/Validations/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
[x: string]: any;
  loading:boolean=false;
  clicked:boolean =false;
  errorMessage:string='';
  SuccessfulMessage:string = '';
  rePassMisMatch :string = '';


  SignUpForm : FormGroup = new FormGroup({
    name:new FormControl('',[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    rePassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },
  {
    validators :[repasswordMatchPassord()]
  });


  constructor(private _authS:AuthService, private router:Router,private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.SignUpForm;
  }
  handleSignUp(){
    this.clicked=true;
    this.loading=true;
    if(this.SignUpForm.invalid){
      this.loading=true;
      return;
    }

    this.loading=true;
    if(this.SignUpForm.valid){
      this._authS.signUp(this.SignUpForm.value).subscribe({
        next:(data:any)=>{
          this.loading=false;
          if(data){
            this.errorMessage ='';
            this.SuccessfulMessage= "Sign Up successful";
            this.router.navigate(['/login']);
            this.toastr.success('Go to login');
          }
          console.log(data);
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

    }
  }
}
