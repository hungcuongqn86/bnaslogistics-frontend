import {Pipe, PipeTransform} from '@angular/core';
import {PackageStatus} from '../models/Package';

@Pipe({
    name: 'tempPkStatus'
})
export class TempPkStatusPipe implements PipeTransform {
    transform(code: number, status: PackageStatus[]): string {
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
