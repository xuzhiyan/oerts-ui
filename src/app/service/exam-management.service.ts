import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ExamManagementService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getAllExams() {
    return this.http.get('/oerts/exam/info/all');
  }

  getExamById(id: string) {
    const url = '/oerts/exam/info/id/' + id;
    return this.http.get(url);
  }

  addExam(body: any) {
    return this.http.post('/oerts/exam/info/add', body, {headers: this.header});
  }

  getExamByIsEntry(isEntry: number) {
    const url = '/oerts/exam/info/' + isEntry;
    return this.http.get(url);
  }

}
