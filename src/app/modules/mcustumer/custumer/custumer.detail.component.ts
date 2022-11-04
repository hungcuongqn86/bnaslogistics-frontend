import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/muser/user.service';
import {AuthService} from '../../../auth.service';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-mcustumer-custumer-detail',
  templateUrl: './custumer.detail.component.html',
  styleUrls: ['./custumer.detail.component.css']
})

export class CustumerDetailComponent implements OnInit {
  modalRef: BsModalRef;
  public resetPass: { password: string, password_confirmation: string };
  show = false;
  show1 = false;
  errorMessage: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute
    , public authService: AuthService
    , private modalService: BsModalService
    , public userService: UserService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userService.user.id = params['id'];
      }
    });
    this.resetPass = {
      password: null,
      password_confirmation: null
    };
  }

  ngOnInit() {
    if (this.userService.user.id !== null) {
      this.getUser();
    } else {
      this.userService.reset();
    }
  }

  public showpassword() {
    this.show = !this.show;
  }

  public showpassword1() {
    this.show1 = !this.show1;
  }

  public getUser(): void {
    this.userService.getUser(this.userService.user.id)
      .subscribe(user => {
        this.userService.user = user.data.user;
        if (this.userService.user.roles.length) {
          this.userService.user.role_id = this.userService.user.roles[0].id;
        }
      });
  }

  public backlist() {
    this.router.navigate(['/mcustumer/custumer']);
  }

  public activeOpenDialog(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmActive(): void {
    this.errorMessage = [];
    if (this.userService.user.id !== null) {
      this.userService.showLoading(true);
      this.userService.activeUser(this.userService.user.id)
        .subscribe(user => {
          if (user.status) {
            this.getUser();
          } else {
            this.errorMessage = user.data;
          }
          this.userService.showLoading(false);
        });
    }
    this.modalRef.hide();
  }

  public confirmChangePass(): void {
    this.errorMessage = [];
    if (this.userService.user.id !== null) {
      this.userService.showLoading(true);
      this.userService.changePass(this.userService.user.id, this.resetPass)
        .subscribe(user => {
          if (user.status) {
            this.getUser();
          } else {
            this.errorMessage = user.data;
          }
          this.userService.showLoading(false);
        });
    }
    this.modalRef.hide();
  }

  public changePassOpenDialog(template: TemplateRef<any>): void {
    this.resetPass = {
      password: null,
      password_confirmation: null
    };
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  public decline(): void {
    this.modalRef.hide();
  }
}
