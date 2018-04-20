import {Component, OnInit} from '@angular/core';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/CompleteRegistExamInfo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.css']
})
export class TestCompleteComponent implements OnInit {

  completeREInfo: Array<CompleteRegistExamInfo> = new Array();

  constructor(private examRService: ExamRegistrationService,
              private router: Router) {
  }

  ngOnInit() {
    this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(data => {
      this.completeREInfo = data.json().data;
    })
  }

  onCancelRegist(item: string, message: string) {
    console.log(item);
    if (window.confirm(message)) {
      const body = {'examId': item, 'idCard': sessionStorage.getItem('user_idcard')};
      this.examRService.deleteByIdCardAndExamID(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(value => {
            this.completeREInfo = value.json().data;
          });
        }
      });
    }
  }
}
