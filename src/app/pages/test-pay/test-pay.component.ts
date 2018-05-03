import {Component, OnInit} from '@angular/core';
import {ExamInfo} from '../../model/ExamInfo';
import {ExamRegistrationService} from '../../service/exam-registration.service';

@Component({
  selector: 'app-test-pay',
  templateUrl: './test-pay.component.html',
  styleUrls: ['./test-pay.component.css']
})
export class TestPayComponent implements OnInit {

  paidInfo: Array<ExamInfo> = new Array();
  unpaidInfo: Array<ExamInfo> = new Array();

  constructor(private examRService: ExamRegistrationService) {
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

}
