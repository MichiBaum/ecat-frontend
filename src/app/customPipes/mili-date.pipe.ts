import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miliDate'
})
export class MiliDatePipe implements PipeTransform {

  transform(value: number): Date {
    if(value){
      return new Date(value);
    }else{
      return null;
    }
  }

}
