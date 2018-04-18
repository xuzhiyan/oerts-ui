import {Component, OnInit} from '@angular/core';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/CompleteRegistExamInfo';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.css']
})
export class TestCompleteComponent implements OnInit {

  completeREInfo: Array<CompleteRegistExamInfo> = new Array();

  constructor(private examRService: ExamRegistrationService) {
  }

  ngOnInit() {
    this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(data => {
      this.completeREInfo = data.json().data;
    })
  }

}
