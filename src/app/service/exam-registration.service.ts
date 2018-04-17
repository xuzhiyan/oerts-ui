import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ExamRegistrationService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  examRegistByIdCardAndExamID(examId: string, userPhone: string) {
    const url = '/oerts/registration/' + examId + '/' + userPhone;
    return this.http.get(url);
  }
}
