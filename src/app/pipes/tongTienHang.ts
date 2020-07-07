import {Pipe, PipeTransform} from '@angular/core';
import {Order} from '../services/order/order.service';

@Pipe({
    name: 'tempTongTienHang'
})
export class TempTongTienHangPipe implements PipeTransform {
    transform(order: Order, output: number): string {
        let vndTotal = order.tong;
        const tigia = order.rate;
        let shiptq = 0;
        if (order.package) {
            for (let i = 0; i < order.package.length; i++) {
                if (order.package[i].ship_khach) {
                    const ndt = order.package[i].ship_khach;
                    const vnd = ndt * tigia;
                    shiptq = shiptq + vnd;
                    vndTotal = vndTotal + vnd;
                }
            }
        }

        if (output === 2) {
            let conThieu = vndTotal - order.thanh_toan;
            conThieu = Math.round(conThieu * 100) / 100;
            return this.formatCurrency(conThieu.toString());
        }

        if (output === 3) {
            shiptq = Math.round(shiptq * 100) / 100;
            return this.formatCurrency(shiptq.toString());
        }

        return this.formatCurrency(vndTotal.toString());
    }

    formatCurrency(number: string) {
        const n = number.split('').reverse().join('');
        const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
        return n2.split('').reverse().join('');
    }
}
