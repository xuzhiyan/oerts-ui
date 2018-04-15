import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css'],
})
export class TestRegistrationComponent implements OnInit {

  examInfo: Array<ExamInfo> = new Array();
  // test: Array<ExamInfo> = new Array();
  // ttt: any;

  constructor(private examService: ExamManagementService,
              private router: Router) {
  }

  ngOnInit() {

    this.examService.getAllExams().subscribe(data => {
      this.examInfo = data.json().data;
    });

    // this.httpt.get('/oerts/exams').subscribe(data => {
    //   this.test = _.values(data);
    //   // console.log('####  this.test ', this.test[0].examId);
    //   // this.ttt = data;
    //   // console.log(this.ttt[0].examId);
    // });
    //
    // this.httpt.get('/oerts/exam/1000006').subscribe(data => {
    //   this.ttt = data;
    //   console.log(this.ttt.examId);
    // });
  }

  onDetails(item: any) {
    this.router.navigate(['/layout/test-details', item.examId]);
  }
}
