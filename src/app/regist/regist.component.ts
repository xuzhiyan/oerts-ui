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
          // alert('注册成功，快去登录把！');
          this.modalRef = this.modalService.show(success);
          this.router.navigate(['/login']);
        } else {
          // alert('注册失败，该手机号已经被注册！');
          this.modalRef = this.modalService.show(failed);
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

  // existUserPhone(): any {
  //   this.http.get('/oerts/countByUserPhone/' + this.registModel.value.userphone).subscribe(data => {
  //     if (data.json().data !== '0') {
  //       return {userphoneValid: {errorDesc: '手机号已经被注册'}};
  //     } else {
  //       return null;
  //     }
  //   });
  // }

}
