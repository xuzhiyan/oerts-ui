import {Component, OnInit} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: String = '';
  public password: String = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  userLogin() {
    if (this.username === 'xzy' && this.password === '123456') {
      this.router.navigate(['/layout']);
    } else {
      window.alert('账号/密码错误');
    }

  }

  userRegister() {
    this.router.navigate(['/register']);
  }
}
