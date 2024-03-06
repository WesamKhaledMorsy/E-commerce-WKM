import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/main/home/home.component';
import { NavbarComponent } from './Components/main/navbar/navbar.component';
import { FooterComponent } from './Components/main/footer/footer.component';
import { RegisterComponent } from './Components/LoginRegister/register/register.component';
import { LoginComponent } from './Components/LoginRegister/login/login.component';
import { NotFoundPageComponent } from './Components/main/not-found-page/not-found-page.component';
import { CategoryListComponent } from './Components/Categories/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainsliderComponent } from './Components/main/mainslider/mainslider.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { SeemoreHomePipe } from './pipes/seemore-home.pipe';
import { SearchHomePipe } from './pipes/search-home.pipe';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { HeaderInterceptor } from './Interceptors/header.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { PaymentComponent } from './Components/Payment/payment/payment.component';
import { CategoryDetailsComponent } from './Components/Categories/category-details/category-details.component';
import { BrandsComponent } from './Components/Brands/brands/brands.component';
import { BrandDetailsComponent } from './Components/Brands/brand-details/brand-details.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundPageComponent,
    CategoryListComponent,
    MainsliderComponent,
    SeemoreHomePipe,
    SearchHomePipe,
    CartComponent,
    PaymentComponent,
    CategoryDetailsComponent,
    BrandsComponent,
    BrandDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    NgxPaginationModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
