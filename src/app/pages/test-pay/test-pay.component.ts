import {Component, OnInit} from '@angular/core';
import {ExamInfo} from '../../model/ExamInfo';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {PathKeyService} from '../../service/path-key.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-pay',
  templateUrl: './test-pay.component.html',
  styleUrls: ['./test-pay.component.css']
})
export class TestPayComponent implements OnInit {

  paidInfo: Array<ExamInfo> = new Array();
  unpaidInfo: Array<ExamInfo> = new Array();

  constructor(private examRService: ExamRegistrationService,
              private pathKeyService: PathKeyService,
              private router: Router) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('user_idcard') !== '') {
      this.examRService.getPayList(sessionStorage.getItem('user_idcard'), '20').subscribe(data => {
        this.paidInfo = data.json().data;
      });
      this.examRService.getPayList(sessionStorage.getItem('user_idcard'), '10').subscribe(data => {
        this.unpaidInfo = data.json().data;
      });
    }
  }

  onPayTest(examName: string, cost: number, examId: string) {
    this.pathKeyService.examName = examName;
    this.pathKeyService.cost = cost;
    this.pathKeyService.examId = examId;
    this.router.navigate(['/layout/pay-page']);
  }

}
