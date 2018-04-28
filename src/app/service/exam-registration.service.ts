import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ExamRegistrationService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  examRegistByIdCardAndExamID(body: any) {
    return this.http.post('/oerts/exam/registration/regist', body, {headers: this.header});
  }

  countByIdCardAndExamID(examId: string, idCard: string) {
    const url = '/oerts/countregist/' + examId + '/' + idCard;
    return this.http.get(url);
  }

  completeResgistList(idCard: string) {
    const url = '/oerts/testcompletelist/' + idCard;
    return this.http.get(url);
  }

  deleteByIdCardAndExamID(body: any) {
    return this.http.post('/oerts/registration/delete', body, {headers: this.header});
  }

  getPayList(idCard: string, status: string) {
    const url = '/oerts/registration/payList/' + idCard + '/' + status;
    return this.http.get(url);
  }

  getScoreByAdmissionTicket(admissionTicket: string) {
    const url = '/oerts/registration/score/' + admissionTicket;
    return this.http.get(url);
  }
}
