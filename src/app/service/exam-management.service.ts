import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ExamManagementService {

  constructor(private http: Http) {
  }

  getAllExams() {
    return this.http.get('/oerts/exams');
  }

  getExamById(id: string) {
    const url = '/oerts/exam/' + id;
    return this.http.get(url);
  }

}
