import {Component, TemplateRef} from '@angular/core';
import {LoadingService} from '../loading.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent {
    modalRef: BsModalRef;

    constructor(public loadingService: LoadingService, private modalService: BsModalService) {
    }

    public showLoading(template: TemplateRef<any>) {
        setTimeout(() => {
            if (this.loadingService.progress.type === 'progress') {
                if (this.loadingService.progress.progress < 100) {
                    if (!this.modalRef) {
                        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
                    }
                } else {
                    this.closeAllModals();
                }
            }
        });
    }

    private closeAllModals() {
        setTimeout(() => {
            for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
                this.modalService.hide(i);
            }
            this.modalRef = null;
            document.body.classList.remove('modal-open');
        }, 1500);
    }
}
