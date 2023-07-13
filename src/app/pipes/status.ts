import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from '../models/interface';

@Pipe({
  name: 'tempStatus'
})
export class TempStatusPipe implements PipeTransform {
  transform(code: number, status: OrderStatus[]): string {
    if (status && status.length) {
      for (let i = 0; i < status.length; i++) {
        if (status[i].id === code) {
          return status[i].name;
        }
      }
    }
    return '';
  }
}
