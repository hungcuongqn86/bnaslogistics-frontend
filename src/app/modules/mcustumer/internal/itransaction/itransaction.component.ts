import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {BankAccountService} from '../../../../services/bankAccount.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TransactionType, Transaction} from '../../../../models/Transaction';
import {AuthService} from '../../../../auth.service';

@Component({
    selector: 'app-mcustumer-internal-detail-transaction',
    templateUrl: './itransaction.component.html',
    styleUrls: ['./itransaction.component.css']
})

export class ItransactionComponent {
    modalRef: BsModalRef;
    types: TransactionType[];
    transactions: Transaction[];

    constructor(public userService: UserService, public bankAccountService: BankAccountService,
                public authService: AuthService, private modalService: BsModalService) {
        this.getTypes();
        this.getTransactions();
    }

    private getTransactions() {
        this.bankAccountService.getTransactions(this.bankAccountService.account.id)
            .subscribe(transactions => {
                this.transactions = transactions.data.data;
            });
    }

    private getTypes() {
        this.userService.getTransactionTypes()
            .subscribe(types => {
                this.types = types.data;
            });
    }

    public confirm(): void {
        this.userService.addTransaction()
            .subscribe(transaction => {
                this.modalRef.hide();
                this.getTransactions();
                this.userService.transaction = {
                    id: null, user_id: null, code: null, content: null, type: null, value: null, otype: null,
                    debt: null, is_deleted: 0, created_at: '', updated_at: '', bank_account: null, bank_debt: null, user: null
                };
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }

    public addTransaction(template) {
        this.userService.transaction.bank_account = this.bankAccountService.account.id;
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }
}
