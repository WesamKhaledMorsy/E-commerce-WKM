import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './UserData/user-data.component';
import { authGuard } from '../Guards/auth.guard';
import { ForgetPasswordComponent } from './ForgetPassword/ForgetPassword.component';

const routes: Routes = [
  { path: '', redirectTo:'update_user',pathMatch:'full'},
  {path:'update_user',component:ForgetPasswordComponent,title:'Forget Password'},
  { path: 'user_data', component: UserDataComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
