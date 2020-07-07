import { Pipe, PipeTransform } from '@angular/core';
import {Cart} from '../models/Cart';

@Pipe({
    name: 'tempTotalPrice'
})
export class TempTotalPricePipe implements PipeTransform {
    transform(carts: Cart[]): string {
        let vndTotal = 0;
        for(let i = 0;i < carts.length; i++) {
            const ndt = parseFloat(carts[i].price);
            const tigia = parseFloat(carts[i].rate);
            const soluong = carts[i].amount;
            const vnd = ndt * tigia *soluong;
            vndTotal = vndTotal + vnd;
        }
        return this.formatCurrency(vndTotal.toString());
    }

    formatCurrency(number:string){
        const n = number.split('').reverse().join("");
        const n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
        return  n2.split('').reverse().join('');
    }
}