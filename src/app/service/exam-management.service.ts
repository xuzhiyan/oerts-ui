import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ExamManagementService {

  examInfo: any;

  constructor(private http: HttpClient) {
  }

  getAllExams() {
    this.http.get('/oerts/exams').subscribe(data => {
      console.log(data);
      this.examInfo = data;
      return this.examInfo;
    })
  }

}
