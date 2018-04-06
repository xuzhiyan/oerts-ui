import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = '';
  password: String = '';
  loginStatus: boolean;
  userInfo: UserInfo;

  constructor(private router: Router,
              private http: Http) {
  }

  ngOnInit() {
    this.loginStatus = true;
    this.http.get('/oerts/all')
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.userInfo = data
        });
    // console.log(this.userInfo.);
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

export class UserInfo {
  public id: string;
  public idCard: string;
  public userPhone: string;
  public userName: string;
  public userSex: string;
  public userProfession: string;
  public loginPassword: string;
  public payPassword: string;
  public userPhoto: string;
  public residentialAddress: string;
  public emailAddress: string;
  public userBalance: string;
  public lastLogintime: string;
}
