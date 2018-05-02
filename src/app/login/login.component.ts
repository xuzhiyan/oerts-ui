import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExamineeService} from '../service/examinee.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdministratorService} from '../service/administrator.service';

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
  changeLoginMode: string;
  countDownMessage: string;
  cdNum: number;

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
    this.cdNum = 60;
  }

  userInput() {
    this.loginStatus = true;
  }

  userLogin() {
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

  onChangeLoginMode() {
    if (this.loginMode) {
      this.loginMode = false;
      this.changeLoginMode = '使用验证码登录';
    } else {
      this.loginMode = true;
      this.changeLoginMode = '使用密码登录';
    }
  }

  onGetIdentifyCode() {
    // let second = 60;
    // this.countDownMessage = second + '后可重发';
    // setInterval(function () {
    //   console.log(second);
    //   second--;
    //   this.countDownMessage = second + '后可重发';
    //   console.log(this.countDownMessage);
    //   if (second < 0) {
    //     this.countDownMessage = '获取验证码';
    //   }
    // }, 1000);

    setInterval(this.countDown(), 1000);
  }

  countDown() {
    this.cdNum--;
    this.countDownMessage = this.cdNum.toString();
  }

}
