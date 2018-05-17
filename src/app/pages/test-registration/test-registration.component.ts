import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';
import {PathKeyService} from '../../service/path-key.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css'],
})
export class TestRegistrationComponent implements OnInit {

  examInfo: Array<ExamInfo> = new Array();
  dangerMessage: boolean;
  isShowExamInfo: boolean;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private examService: ExamManagementService,
              private router: Router,
              private pathKeyService: PathKeyService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.dangerMessage = true;
    this.isShowExamInfo = false;
    if (sessionStorage.getItem('user_idcard') === '') {
      this.dangerMessage = false;
    }
  }

  onDetails(item: any, temp: TemplateRef<any>) {
    if (sessionStorage.getItem('user_idcard') === '') {
      this.modalRef = this.modalService.show(temp, this.config);
    } else {
      this.pathKeyService.examId = item.examId;
      this.router.navigate(['/layout/test-details']);
    }
  }

  onGetExamInfo(examType: string) {
    this.examService.getExamByType(examType).subscribe(data => {
      this.examInfo = data.json().data;
      this.isShowExamInfo = this.examInfo.length !== 0;
    });
  }
}
