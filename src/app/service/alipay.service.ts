import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class AlipayService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  rechargeBalance(body: any) {
    return this.http.post('/oerts/balance/alipay/recharge', body, {headers: this.header});
  }

  getQueryInfo(body: any) {
    return this.http.post('/oerts/balance/alipay/query', body, {headers: this.header});
  }
}
