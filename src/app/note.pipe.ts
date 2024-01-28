import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'note'
})
export class NotePipe implements PipeTransform {

  transform(value: string): string {
    return value ? value+'/20' : 'Non noté';
  }

}
