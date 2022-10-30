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

  constructor(private router: Router, private route: ActivatedRoute
    , public authService: AuthService
    , private modalService: BsModalService
    , public userService: UserService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userService.user.id = params['id'];
      }
    });
  }

  ngOnInit() {
    if (this.userService.user.id !== null) {
      this.getUser();
    } else {
      this.userService.reset();
    }
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
    if (this.userService.user.id !== null) {
      this.userService.showLoading(true);
      this.userService.activeUser(this.userService.user.id)
        .subscribe(user => {
          this.getUser();
          this.userService.showLoading(false);
        });
    }
    this.modalRef.hide();
  }

  public decline(): void {
    this.modalRef.hide();
  }
}
