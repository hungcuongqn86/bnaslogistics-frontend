import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/muser/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';
import {IUser} from "../../../models/interface";

@Component({
  selector: 'app-custumer',
  templateUrl: './custumer.component.html',
  styleUrls: ['./custumer.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustumerComponent implements OnInit {
  user: IUser;
  users: IUser[];
  totalItems = 0;
  modalRef: BsModalRef;

  constructor(public userService: UserService, public authService: AuthService,
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
    this.router.navigate(['/mcustumer/custumer/add']);
  }

  public editPartner(id) {
    this.router.navigate([`/mcustumer/custumer/edit/${id}`]);
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
    this.userService.getCustumers()
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
