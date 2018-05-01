import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class AdministratorService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  administratorLoginByPassw(body: any) {
    return this.http.post('/oerts/administrator/login/password', body, {headers: this.header});
  }
}
