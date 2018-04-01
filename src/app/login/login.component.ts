import {Component, OnInit} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  userLogin() {
    this.router.navigate(['/layout']);
  }

  userRegister() {
    this.router.navigate(['/register']);
  }
}

export class LoginGuard implements CanActivate {
  canActivate() {
    const isLogin: boolean = Math.random() < 0.5;

    if (!isLogin) {
      console.log('登录');
      return true;
    } else {
      console.log('未登录');
      return false;
    }
  }
}
