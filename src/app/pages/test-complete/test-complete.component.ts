import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/CompleteRegistExamInfo';
import {Router} from '@angular/router';
import {PathKeyService} from '../../service/path-key.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.css']
})
export class TestCompleteComponent implements OnInit {

  completeREInfo: Array<CompleteRegistExamInfo> = new Array();
  examId: string;
  status: string;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };


  constructor(private examRService: ExamRegistrationService,
              private router: Router,
              private pathKeyService: PathKeyService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('user_idcard') !== '') {
      this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(data => {
        this.completeREInfo = data.json().data;
      });
    }
  }

  onCancelRegist(examId: string, status: string, temp: TemplateRef<any>) {
    this.examId = examId;
    this.status = status;
    this.modalRef = this.modalService.show(temp, this.config);
  }

  deleteInfo() {
    const body = {
      'examId': this.examId,
      'idCard': sessionStorage.getItem('user_idcard'),
      'status': this.status
    };
    if (this.status === '11') {
      this.examRService.deleteByIdCardAndExamID(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.modalRef.hide();
          this.router.navigate(['/layout/test-registration']);
        }
      });
    } else {
      this.examRService.deleteByIdCardAndExamID(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(value => {
            this.modalRef.hide();
            this.completeREInfo = value.json().data;
          });
        }
      });
    }
  }

  onSuccessInfo(examId: string) {
    this.pathKeyService.examId = examId;
    this.router.navigate(['/layout/test-successinfo']);
  }
}
