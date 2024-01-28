import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ouiNon'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Oui' : 'Non';
  }

}
