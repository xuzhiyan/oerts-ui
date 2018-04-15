import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ExamineeService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  loginByPassw(body: any) {
    return this.http.post('/oerts/loginbypassw', body, {headers: this.header});
  }

  registByPassw(body: any) {
    return this.http.post('/oerts/registbypassw', body, {headers: this.header});
  }

  countByUserPhone(userPhone: string) {
    const url = '/oerts/countbyuserphone/' + userPhone;
    return this.http.get(url);
  }

  getByUserPhone(userPhone: String) {
    const url = '/oerts/getbyuserphone/' + userPhone;
    return this.http.get(url);
  }

  updateByUserPhone(body: any) {
    const url = '/oerts/updatebyuserphone';
    return this.http.post(url, body, {headers: this.header});
  }
}
