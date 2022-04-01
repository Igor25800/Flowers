import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: string | number): string  {
    if(value) {
      return  `€${value} EUR`
    }
    return  ''

  }

}
