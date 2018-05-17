import {Component, OnInit} from '@angular/core';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/CompleteRegistExamInfo';
import {Router} from '@angular/router';
import {PathKeyService} from '../../service/path-key.service';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.css']
})
export class TestCompleteComponent implements OnInit {

  completeREInfo: Array<CompleteRegistExamInfo> = new Array();

  constructor(private examRService: ExamRegistrationService,
              private router: Router,
              private pathKeyService: PathKeyService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('user_idcard') !== '') {
      this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(data => {
        this.completeREInfo = data.json().data;
      });
    }
  }

  onCancelRegist(item: string, message: string, status: string) {
    if (window.confirm(message)) {
      const body = {
        'examId': item,
        'idCard': sessionStorage.getItem('user_idcard'),
        'status': status
      };
      this.examRService.deleteByIdCardAndExamID(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(value => {
            this.completeREInfo = value.json().data;
          });
        }
      });
    }
  }

  onReReg(item: string) {
    if (window.confirm('重新报名将删除此条记录，你确定嘛？')) {
      const body = {
        'examId': item,
        'idCard': sessionStorage.getItem('user_idcard'),
        'status': '11'
      };
      this.examRService.deleteByIdCardAndExamID(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.router.navigate(['/layout/test-registration']);
        }
      });
    }
  }

  onSuccessInfo(examId: string) {
    this.pathKeyService.examId = examId;
    this.router.navigate(['/layout/test-successinfo']);
  }
}
