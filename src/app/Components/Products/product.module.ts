import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { SeemorePipe } from 'src/app/pipes/seemore.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    SearchPipe,
    SeemorePipe,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    // ReactiveFormsModule,
    ToastrModule.forRoot(),
    // BrowserAnimationsModule,
    CarouselModule,
    NgxPaginationModule
  ]
})
export class ProductModule { }
