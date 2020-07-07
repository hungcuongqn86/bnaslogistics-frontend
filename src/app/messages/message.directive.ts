import {Directive, ElementRef, Input, OnChanges, Output, EventEmitter} from '@angular/core';

export interface Res {
    type: string;
    name: string;
    size: number;
    progress: number;
    data: { url: string; };
    message: string;
    status: boolean;
}

@Directive({selector: '[appMessage]'})
export class MessageDirective implements OnChanges {
    @Output()
    public onLoading = new EventEmitter<any>();
    @Input('message')
    public message: Res;

    constructor(private el: ElementRef) {
    }

    ngOnChanges(changes) {
        if (changes.message) {
            if (this.message && this.message.type) {
                this.onLoading.emit();
            }
        }
    }
}
