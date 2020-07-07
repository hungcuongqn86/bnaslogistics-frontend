import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'tempPrice'
})
export class TempPricePipe implements PipeTransform {
    transform(ndt: string, tigia: number, soluong: number, r: boolean): string {
        if (r !== false) {
            r = true;
        }
        const indt = parseFloat(ndt);
        let vnd = 0;
        if (r) {
            vnd = Math.round(indt * tigia * soluong);
        } else {
            vnd = indt * tigia * soluong;
            vnd = Math.round(vnd * 100) / 100;
        }

        if (vnd >= 0) {
            return this.formatCurrency(vnd.toString());
        } else {
            vnd = 0 - vnd;
            return '-' + this.formatCurrency(vnd.toString());
        }
    }

    formatCurrency(number: string) {
        const n = number.split('').reverse().join('');
        const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
        return n2.split('').reverse().join('');
    }
}
