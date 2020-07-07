import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'tempCountByStatus'
})
export class TempCountByStatusPipe implements PipeTransform {
    transform(code: number, counts: { status: number, total: number }[]): string {
        if (counts && counts.length) {
            for (let i = 0; i < counts.length; i++) {
                if (counts[i].status === code) {
                    return counts[i].total.toString();
                }
            }
        }
        return '';
    }
}
