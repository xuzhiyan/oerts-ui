import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ExamRegistrationService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  examRegistByIdCardAndExamID(examId: string, idCard: string) {
    const url = '/oerts/registration/' + examId + '/' + idCard;
    return this.http.get(url);
  }

  countByIdCardAndExamID(examId: string, idCard: string) {
    const url = '/oerts/countregist/' + examId + '/' + idCard;
    return this.http.get(url);
  }

  completeResgistList(idCard: string) {
    const url = '/oerts/testcompletelist/' + idCard;
    return this.http.get(url);
  }
}
