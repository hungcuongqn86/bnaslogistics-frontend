import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'tempDate'
})
export class TempDatePipe implements PipeTransform {
    transform(sdate: string): string {
        const date = new Date(sdate);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '-' + month + '-' + year;
    }
}
