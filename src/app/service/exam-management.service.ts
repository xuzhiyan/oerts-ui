import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ExamManagementService {

  constructor(private http: HttpClient) {
  }

  getAllExams() {
    return this.http.get('/oerts/exams');
  }

}

// export class ExamInfo {
//   constructor(public examId: string,
//               public examName: string,
//               public cost: number,
//               public maxNum: number,
//               public examPlace: string,
//               public examTimeFrom: Date,
//               public examTimeTo: Date,
//               public regTimeFrom: Date,
//               public regTimeTo: Date,
//               ) {
//
//   }
// }
