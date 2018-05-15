import {Component, OnInit} from '@angular/core';
import {PathKeyService} from '../../service/path-key.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/ExamineeRegistInfo';

@Component({
  selector: 'app-test-successinfo',
  templateUrl: './test-successinfo.component.html',
  styleUrls: ['./test-successinfo.component.css']
})
export class TestSuccessinfoComponent implements OnInit {

  regInfo: Array<CompleteRegistExamInfo> = new Array<CompleteRegistExamInfo>();
  admissionTicketURL: string;

  constructor(private pathKeyService: PathKeyService,
              private examRService: ExamRegistrationService) {
  }

  ngOnInit() {
    this.examRService.getCompleteResgistInfo(sessionStorage.getItem('user_idcard'), this.pathKeyService.examId)
      .subscribe(data => {
        this.regInfo = data.json().data;
        this.admissionTicketURL =
          '/oerts/exam/' + data.json().data.examId + '/admissionTicket/' + data.json().data.admissionTicket + '.html';
      });

  }

  onGetAdmissionTicket() {
    window.open(this.admissionTicketURL);
  }

}
