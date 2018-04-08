import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userphone: String = '';
  password: String = '';
  loginStatus: boolean;
  header = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.loginStatus = true;
    // this.http.get('/oerts/all').subscribe(data => {
    //   console.log(data);
    //   this.userInfo = data;
    //   console.log(this.userInfo[0].id);
    // })
  }

  userInput() {
    this.loginStatus = true;
  }

  userLogin() {
    const body = {'userPhone': this.userphone, 'loginPassword': this.password};
    this.http.post('/oerts/loginbypassw', body, {headers: this.header}).subscribe(data => {
      if (data) {
        // 还要传用户的id
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

// export class UserInfo {
//   public id: string;
//   public idCard: string;
//   public userPhone: string;
//   public userName: string;
//   public userSex: string;
//   public userProfession: string;
//   public loginPassword: string;
//   public payPassword: string;
//   public userPhoto: string;
//   public residentialAddress: string;
//   public emailAddress: string;
//   public userBalance: string;
//   public lastLogintime: string;
// }
