import {Pipe, PipeTransform} from '@angular/core';
import {HistoryType} from '../services/order/order.service';

@Pipe({
    name: 'tempHistoryType'
})
export class TempHistoryTypePipe implements PipeTransform {
    transform(code: number, types: HistoryType[]): string {
        if (types && types.length) {
            for (let i = 0; i < types.length; i++) {
                if (types[i].id === code) {
                    return types[i].name;
                }
            }
        }
        return '';
    }
}
