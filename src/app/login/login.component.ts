import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExamineeService} from '../service/examinee.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdministratorService} from '../service/administrator.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/repeat';
import {userphoneValidator} from '../shared/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // 用于登录界面验证失败提醒
  loginStatus: boolean;
  loginModel: FormGroup;
  loginMode: boolean;
  // 登录方式切换
  changeLoginMode: string;
  // 验证码重新获取倒计时
  countDownMessage: string;
  countDownStatus: boolean;
  // 使用验证码登录时 校验输入的手机号是否格式正确
  userPhoneError: boolean;
  // 暂时储存后台传过来的手机号和验证码
  userPhoneFromServer: string;
  identifyCodeFromServer: string;

  constructor(private router: Router,
              private examineeService: ExamineeService,
              private administratorService: AdministratorService,
              private fb: FormBuilder) {
    this.loginModel = fb.group({
      userphone: [''],
      loginpassword: [''],
      loginidentifycode: ['']
    });
  }

  ngOnInit() {
    this.loginStatus = true;
    this.loginMode = true;
    this.changeLoginMode = '使用密码登录';
    this.countDownMessage = '获取验证码';
    this.countDownStatus = true;
    this.userPhoneError = true;
  }

  userInput() {
    this.loginStatus = true;
    this.userPhoneError = true;
  }

  userLogin() {
    if (this.loginMode) {
      // 使用验证码登录 loginMode = true
      if (this.loginModel.value.userphone === this.userPhoneFromServer &&
        this.loginModel.value.loginidentifycode === this.identifyCodeFromServer) {
        this.examineeService.getByUserPhone(this.loginModel.value.userphone).subscribe(data => {
          if (data.json().data === null) {
            // 用户第一次登录 自动创建一个新用户
            const body = {
              'userPhone': this.loginModel.value.userphone,
              'loginPassword': this.loginModel.value.loginidentifycode + '暂时定义，防止误登录',
              'userName': '用户_' + this.loginModel.value.userphone
            };
            // 创建一个新用户
            this.examineeService.registByIdentifycode(body).subscribe();
            sessionStorage.setItem('user_validate', this.loginModel.value.userphone);
            sessionStorage.setItem('user_idcard', '');
            sessionStorage.setItem('user_name', '用户_' + this.loginModel.value.userphone);
            sessionStorage.setItem('user_photo', 'assets/img/timg.jpg');
            // 跳转
            this.router.navigate(['/layout']);
          } else {
            // 已经注册过的用户登录
            sessionStorage.setItem('user_validate', this.loginModel.value.userphone);
            sessionStorage.setItem('user_idcard', data.json().data.idCard);
            sessionStorage.setItem('user_name', data.json().data.userName);
            sessionStorage.setItem('user_photo', 'assets/img/timg.jpg');
            if (data.json().data.userPhoto === null) {
              sessionStorage.setItem('user_photo', 'assets/img/timg.jpg');
            } else {
              sessionStorage.setItem('user_photo', data.json().data.userPhoto);
            }
            // 跳转
            this.router.navigate(['/layout']);
          }
        });
      } else {
        this.loginStatus = false;
      }
    } else {
      // 使用密码登录 loginMode = false
      const identify = this.loginModel.value.userphone.substring(0, 4);
      if (identify === 'root') {
        const body = {'accountName': this.loginModel.value.userphone, 'loginPassword': this.loginModel.value.loginpassword};
        this.administratorService.administratorLoginByPassw(body).subscribe(data => {
          if (data.json().status === 'success') {
            sessionStorage.setItem('user_validate', 'root');
            sessionStorage.setItem('user_idcard', 'root');
            sessionStorage.setItem('user_name', data.json().data.userName);
            sessionStorage.setItem('user_photo', 'assets/img/timg.jpg');
            this.router.navigate(['/layout']);
          } else {
            this.loginStatus = false;
          }
        });
      } else {
        const body = {'userPhone': this.loginModel.value.userphone, 'loginPassword': this.loginModel.value.loginpassword};
        this.examineeService.loginByPassw(body).subscribe(data => {
          if (data.json().status === 'success') {
            sessionStorage.setItem('user_validate', this.loginModel.value.userphone);
            sessionStorage.setItem('user_idcard', data.json().data.idCard);
            sessionStorage.setItem('user_name', data.json().data.userName);
            if (data.json().data.userPhoto === null) {
              sessionStorage.setItem('user_photo', 'assets/img/timg.jpg');
            } else {
              sessionStorage.setItem('user_photo', data.json().data.userPhoto);
            }
            this.router.navigate(['/layout']);
          } else {
            this.loginStatus = false;
          }
        });
      }
    }

  }

  onChangeLoginMode() {
    this.userInput();
    if (this.loginMode) {
      this.loginMode = false;
      this.changeLoginMode = '使用验证码登录';
    } else {
      this.loginMode = true;
      this.changeLoginMode = '使用密码登录';
    }
  }

  onGetIdentifyCode() {
    const phoneReq = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    const valid = phoneReq.test(this.loginModel.value.userphone);
    if (!valid || this.loginModel.value.userphone === '') {
      this.userPhoneError = false;
    } else {
      // 从后台获取验证码和手机号
      const body = {'userPhone': this.loginModel.value.userphone};
      this.examineeService.loginByIdentifycode(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.userPhoneFromServer = data.json().data.userPhone;
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
  }
}
