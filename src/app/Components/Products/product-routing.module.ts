import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuard } from 'src/app/Guards/auth.guard';

const routes: Routes = [
  {path:'',component:ProductListComponent,canActivate:[authGuard]},
  {path:'product_list',component:ProductListComponent,canActivate:[authGuard]},
  {path:'product_details/:id',component:ProductDetailsComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
