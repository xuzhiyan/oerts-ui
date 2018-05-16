import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ExcelService {

  constructor(private http: Http) {
  }


  getExamineeExcelById(examId: string) {
    const url = '/oerts/excel/info/examinee/' + examId;
    return this.http.get(url);
  }

  getScoreExcelById(examId: string) {
    const url = '/oerts/excel/info/score/' + examId;
    return this.http.get(url);
  }
}
