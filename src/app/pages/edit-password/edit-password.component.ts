import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExamineeService} from '../../service/examinee.service';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup} from '@angular/forms';
import {passwordValidator} from '../../shared/validators/validators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  changeModel: FormGroup;
  validStatus: boolean;
  userPhone: string;
  userName: string;
  identifyCodeFromServer: string;
  countDownStatus: boolean;
  countDownMessage: string;
  identifyError: boolean;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private examineeService: ExamineeService,
              private fb: FormBuilder,
              private modalService: BsModalService) {
    this.changeModel = this.fb.group({
      identifycode: [''],
      loginPasswordsGroup: fb.group({
        loginpassword: [''],
        pconfirm: ['']
      }, {validator: passwordValidator})
    });
  }

  ngOnInit() {
    this.userName = sessionStorage.getItem('user_name');
    this.userPhone = sessionStorage.getItem('user_validate');
    this.countDownStatus = true;
    this.countDownMessage = '获取验证码';
    this.validStatus = true;
    this.identifyError = true;
  }

  onGetIdentifyCode() {
    // 从后台获取验证码和手机号
    const body = {'userPhone': this.userPhone};
    this.examineeService.updateByIdentifycode(body).subscribe(data => {
      if (data.json().status === 'success') {
        this.identifyCodeFromServer = data.json().data.code;
      }
    });

    this.countDownStatus = false;
    Observable.interval(1000).take(60).repeat(1).subscribe(countDown => {
      const cdNum = 59 - countDown;
      if (cdNum < 1) {
        this.countDownStatus = true;
        this.countDownMessage = '获取验证码';
      } else {
        this.countDownMessage = cdNum.toString() + 's后可重发';
      }
    });
  }

  onChangePassw(temp: TemplateRef<any>) {
    if (this.changeModel.valid) {
      if (this.changeModel.value.identifycode === this.identifyCodeFromServer) {
        // 更新表中密码数据
        const body = {
          'userPhone': this.userPhone,
          'loginPassword': this.changeModel.value.loginPasswordsGroup.loginpassword
        };
        this.examineeService.updatePasswByUserPhone(body).subscribe(data => {
          if (data.json().status === 'success') {
            this.onReset();
            this.modalRef = this.modalService.show(temp, this.config);
            this.identifyCodeFromServer = '验证码重置，防止再次利用！！！！';
          }
        });
      } else {
        this.identifyError = false;
      }
    } else {
      this.validStatus = false;
    }
  }

  onReset() {
    this.changeModel.reset();
    this.identifyError = true;
    this.validStatus = true;
  }

  userInput() {
    this.identifyError = true;
  }

}
