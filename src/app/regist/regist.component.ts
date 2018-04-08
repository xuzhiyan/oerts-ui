import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {passwordValidator, usernameValidator, userphoneValidator} from '../shared/validators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  registModel: FormGroup;
  header = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private fb: FormBuilder,
              private http: HttpClient) {
    this.registModel = fb.group({
      username: ['', usernameValidator],
      // userphone: ['', userphoneValidator],
      userphone: ['',],
      loginPasswordsGroup: fb.group({
        loginpassword: [''],
        pconfirm: ['']
      }, {validator: passwordValidator})
    })
  }

  ngOnInit() {
  }

  onRegist() {
    if (this.registModel.valid) {
      console.log('开始注册');
      console.log(this.registModel.value.username);
      const body = {
        'userName': this.registModel.value.username,
        'userPhone': this.registModel.value.userphone,
        'loginPassword': this.registModel.value.loginpassword
      };
      // this.http.post(
    }
  }

  onReset() {
    this.registModel.reset();
  }

}
