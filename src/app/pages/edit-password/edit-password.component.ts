import {Component, OnInit} from '@angular/core';
import {ExamineeService} from '../../service/examinee.service';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup} from '@angular/forms';
import {passwordValidator} from '../../shared/validators/validators';

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

  constructor(private examineeService: ExamineeService,
              private fb: FormBuilder) {
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
    this.countDownMessage = '获取验证码'
    this.validStatus = true;
    this.identifyError = true;
  }

  onGetIdentifyCode() {
    // 从后台获取验证码和手机号
    const body = {'userPhone': this.userPhone};
    this.examineeService.updatePasswByIdentifycode(body).subscribe(data => {
      if (data.json().status === 'success') {
        this.identifyCodeFromServer = data.json().data.code;
      } else {
        alert('获取验证码失败');
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

  onChangePassw() {
    if (this.changeModel.valid) {
      if (this.changeModel.value.identifycode === this.identifyCodeFromServer) {
        // 更新表中密码数据
        
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

}
