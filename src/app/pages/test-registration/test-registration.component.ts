import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamManagementService} from '../../service/exam-management.service';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css'],
})
export class TestRegistrationComponent implements OnInit {

  examInfo: any;

  constructor(private http: HttpClient,
              private examService: ExamManagementService) {
  }

  ngOnInit() {
    // this.http.get('/oerts/exams').subscribe(data => {
    //   console.log(data);
    //   this.examInfo = data;
    //   console.log(this.examInfo);
    // })

    this.examService.getAllExams().subscribe(data => {
      this.examInfo = data;
    });

    // this.http.get<ExamInfo>('/oerts/exams').subscribe((data: ExamInfo) => this.examInfo = { ...data});

    // this.http.get<ExamInfo>('/oerts/exams').subscribe((data: ExamInfo) => this.examInfo = {
    //   examId: data[`examId`],
    //   examName: data[`examName`],
    //   cost: data[`cost`],
    //   maxNum: data[`maxNum`],
    //   examPlace: data[`examPlace`],
    //   examTimeFrom: data[`examTimeFrom`],
    //   examTimeTo: data[`examTimeTo`],
    //   regTimeFrom: data[`regTimeFrom`],
    //   regTimeTo: data[`regTimeTo`]
    // });
    // console.log(this.examInfo.cost);
  }
}

// export interface ExamInfo {
//
//   examId: string,
//
//   examName: string,
//
//   cost: number,
//
//   maxNum: number,
//
//   examPlace: string,
//
//   examTimeFrom: Date,
//
//   examTimeTo: Date,
//
//   regTimeFrom: Date,
//
//   regTimeTo: Date,
// }
