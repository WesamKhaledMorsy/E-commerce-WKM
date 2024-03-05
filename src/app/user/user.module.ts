import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ForgetPasswordComponent } from './ForgetPassword/ForgetPassword.component';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserDataComponent } from './UserData/user-data.component';
import { UserAddressComponent } from './user-address/user-address.component';


@NgModule({
  declarations: [
    ForgetPasswordComponent,
    UserDataComponent,
    UserAddressComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    ReactiveFormsModule,

  ]
})
export class UserModule { }
