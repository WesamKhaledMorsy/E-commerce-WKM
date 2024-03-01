import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[],term:string): Product[] {
    return value.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
