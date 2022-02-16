import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/muser/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {IUser} from "../../../models/interface";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class UserComponent implements OnInit {
    user: IUser;
    users: IUser[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public userService: UserService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchUsers();
    }

    pageChanged(event: any): void {
        this.userService.search.page = event.page;
        this.searchUsers();
    }

    public addPartner() {
        this.userService.user.id = null;
        this.router.navigate(['/muser/user/add']);
    }

    public editPartner(id) {
        this.router.navigate([`/muser/user/edit/${id}`]);
    }

    public deletePartner() {
        if (this.user) {
            this.user.is_deleted = 1;
            this.userService.editUser(this.user)
                .subscribe(res => {
                    this.searchUsers();
                });
        }
    }

    public searchUsers() {
        this.userService.showLoading(true);
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users.data.data;
                this.totalItems = users.data.total;
                this.userService.showLoading(false);
            });
    }

    openModal(template: TemplateRef<any>, item) {
        this.user = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deletePartner();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
