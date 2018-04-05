import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {passwordValidator, usernameValidator, userphoneValidator} from '../shared/validators';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  registModel: FormGroup;

  constructor(fb: FormBuilder) {
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
  }

  onRegist() {
    if (this.registModel.valid) {
      console.log('开始注册');
    }
  }

  onReset() {
    this.registModel.reset();
  }

}
