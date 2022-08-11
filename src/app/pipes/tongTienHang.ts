import {Pipe, PipeTransform} from '@angular/core';
import {IOrder} from '../models/interface';

@Pipe({
    name: 'tempTongTienHang'
})
export class TempTongTienHangPipe implements PipeTransform {
    transform(order: IOrder, output: number): string {
        let vndTotal = order.tien_hang + order.phi_dat_hang_tt + order.phi_kiem_dem_tt + order.ship_khach_tt;

        if (output === 2) {
            if (order.package) {
                for (let i = 0; i < order.package.length; i++) {
                    if (order.package[i].tien_can_tt) {
                        vndTotal = vndTotal + Number(order.package[i].tien_can_tt);
                    }

                    if (order.package[i].tien_dong_go) {
                        vndTotal = vndTotal + Number(order.package[i].tien_dong_go);
                    }

                    if (order.package[i].tien_chong_soc_tt) {
                        vndTotal = vndTotal + Number(order.package[i].tien_chong_soc_tt);
                    }

                    if (order.package[i].phi_van_phat_sinh) {
                        vndTotal = vndTotal + Number(order.package[i].phi_van_phat_sinh);
                    }
                }
            }
        }

        return this.formatCurrency(vndTotal.toString());
    }

    formatCurrency(number: string) {
        const n = number.split('').reverse().join('');
        const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
        return n2.split('').reverse().join('');
    }
}
