import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class OnlineQaService {

  constructor(private http: Http) {

  }

  getCommonQuestion() {
    const url = '/oerts/onlineqa/question/common';
    return this.http.get(url);
  }

  getAnswerByKey(item: string) {
    const url = '/oerts/onlineqa/question/' + item;
    return this.http.get(url);
  }
}
