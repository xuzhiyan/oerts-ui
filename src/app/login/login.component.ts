import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExamineeService} from '../service/examinee.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // 用于登录界面验证失败提醒
  loginStatus: boolean;
  loginModel: FormGroup;

  constructor(private router: Router,
              private examineeService: ExamineeService,
              private fb: FormBuilder) {
    this.loginModel = fb.group({
      userphone: [''],
      loginpassword: ['']
    });
  }

  ngOnInit() {
    this.loginStatus = true;
  }

  userInput() {
    this.loginStatus = true;
  }

  userLogin() {
    const body = {'userPhone': this.loginModel.value.userphone, 'loginPassword': this.loginModel.value.loginpassword};
    this.examineeService.loginByPassw(body).subscribe(data => {
      if (data.json().status === 'success') {
        sessionStorage.setItem('user_validate', this.loginModel.value.userphone)
        this.router.navigate(['/layout']);
      } else {
        this.loginStatus = false;
      }
    });
  }

  userRegister() {
    this.router.navigate(['/regist']);
  }
}
