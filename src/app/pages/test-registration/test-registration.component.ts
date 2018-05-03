import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';
import {PathKeyService} from '../../service/path-key.service';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css'],
})
export class TestRegistrationComponent implements OnInit {

  examInfo: Array<ExamInfo> = new Array();
  // test: Array<ExamInfo> = new Array();
  // ttt: any;
  dangerMessage: boolean;

  constructor(private examService: ExamManagementService,
              private router: Router,
              private pathKeyService: PathKeyService) {
  }

  ngOnInit() {
    this.dangerMessage = true;
    this.examService.getAllExams().subscribe(data => {
      this.examInfo = data.json().data;
    });
    if (sessionStorage.getItem('user_idcard') === '') {
      this.dangerMessage = false;
    }

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
    if (sessionStorage.getItem('user_idcard') === '') {
      alert('请先完善用户信息后再报名！');
    } else {
      this.pathKeyService.examId = item.examId;
      this.router.navigate(['/layout/test-details']);
    }
  }
}
