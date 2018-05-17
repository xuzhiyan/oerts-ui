import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {passwordValidator, usernameValidator, userphoneValidator} from '../shared/validators/validators';
import {ExamineeService} from '../service/examinee.service';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  validStatus: boolean;
  registModel: FormGroup;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private examineeService: ExamineeService,
              private router: Router,
              private fb: FormBuilder,
              public http: Http,
              private modalService: BsModalService) {
    this.registModel = fb.group({
      username: ['', usernameValidator],
      userphone: ['', userphoneValidator],
      loginPasswordsGroup: fb.group({
        loginpassword: [''],
        pconfirm: ['']
      }, {validator: passwordValidator})
    })
  }

  ngOnInit() {
    this.validStatus = true;
  }

  onRegist(success: TemplateRef<any>, failed: TemplateRef<any>) {
    if (this.registModel.valid) {
      const body = {
        'userName': this.registModel.value.username,
        'userPhone': this.registModel.value.userphone,
        'loginPassword': this.registModel.value.loginPasswordsGroup.loginpassword
      };
      this.examineeService.registByPassw(body).subscribe(data => {
        if (data.json().status === 'success') {
          // 注册成功提示
          this.modalRef = this.modalService.show(success, this.config);
        } else {
          // 注册失败提示
          this.modalRef = this.modalService.show(failed, this.config);
        }
      })
    } else {
      this.validStatus = false;
    }
  }

  onReset() {
    this.validStatus = true;
    this.registModel.reset();
  }

  onSuccess() {
    this.modalRef.hide();
    this.router.navigate(['/login']);
  }
}
