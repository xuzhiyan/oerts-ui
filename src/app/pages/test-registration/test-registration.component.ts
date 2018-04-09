import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamManagementService} from '../../service/exam-management.service';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css']
})
export class TestRegistrationComponent implements OnInit {

  examInfo: any;

  constructor(private http: HttpClient,
              private examService: ExamManagementService) {
  }

  ngOnInit() {
    this.http.get('/oerts/exams').subscribe(data => {
      this.examInfo = data;
      // console.log(this.examInfo.length);
    })

    // console.log(this.examService.getAllExams());
    // this.examInfo = this.examService.getAllExams();
    // console.log(this.examInfo);
  }

}
