import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondDate'
})
export class MillisecondDatePipe implements PipeTransform {

  transform(value: number): Date {
    if(value){
      return new Date(value);
    }else{
      return null;
    }
  }

}
