import {Component, OnInit} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = '';
  password: String = '';
  loginStatus: boolean;


  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loginStatus = true;
  }

  userInput() {
    this.loginStatus = true;
  }

  userLogin() {
    if (this.username === 'xzy' && this.password === '123456') {
      this.router.navigate(['/layout']);
    } else {
      this.loginStatus = false;
    }

  }

  userRegister() {
    this.router.navigate(['/regist']);
  }

}
