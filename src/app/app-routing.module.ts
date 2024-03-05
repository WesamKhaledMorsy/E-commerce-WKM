import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/main/home/home.component';
import { NotFoundPageComponent } from './Components/main/not-found-page/not-found-page.component';
import { RegisterComponent } from './Components/LoginRegister/register/register.component';
import { LoginComponent } from './Components/LoginRegister/login/login.component';
import { ProductListComponent } from './Components/Products/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { CategoryListComponent } from './Components/Categories/category-list/category-list.component';
import { authGuard } from './Guards/auth.guard';
import { loginGuard } from './Guards/login.guard';
import { ProductModule } from './Components/Products/product.module';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { PaymentComponent } from './Components/Payment/payment/payment.component';
import { CategoryDetailsComponent } from './Components/Categories/category-details/category-details.component';
import { BrandsComponent } from './Components/Brands/brands/brands.component';
import { BrandDetailsComponent } from './Components/Brands/brand-details/brand-details.component';
import { ForgetPasswordComponent } from './user/ForgetPassword/ForgetPassword.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: 'forgot',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
  {
    path: 'product',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./Components/Products/product.module').then(
        (m) => m.ProductModule
      ),
  },
  {
    path: 'category_list',
    component: CategoryListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'categoryDetails/:id',
    component: CategoryDetailsComponent,
    title: 'category',
    canActivate: [authGuard],
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [authGuard],
    title: 'Brands',
  },
  {
    path: 'brandDetails/:id',
    component: BrandDetailsComponent,
    title: 'brand details',
    canActivate: [authGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  {
    path: 'wish_list',
    loadComponent: () =>
      import('./Components/WishList/wish-list/wish-list.component').then(
        (mod) => mod.WishListComponent
      ),
    canActivate: [authGuard],
    title: 'Wish List',
  },
  {
    path: 'settings',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'payment/:cartId',
    component: PaymentComponent,
    title: 'Payment',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./Components/Cart/all-orders/all-orders.component').then(
        (mod) => mod.AllOrdersComponent
      ),
    canActivate: [authGuard],
    title: 'allOrders',
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
