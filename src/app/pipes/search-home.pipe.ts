import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product';

@Pipe({
  name: 'searchHome'
})
export class SearchHomePipe implements PipeTransform {


  transform(value: Product[],term:string): Product[] {
    return value.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()));
  }
}
