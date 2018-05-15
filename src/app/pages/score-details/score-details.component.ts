import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';

@Component({
  selector: 'app-score-details',
  templateUrl: './score-details.component.html',
  styleUrls: ['./score-details.component.css']
})
export class ScoreDetailsComponent implements OnInit {

  examInfo: Array<ExamInfo>;

  constructor(private examService: ExamManagementService) {
  }

  ngOnInit() {
    this.examService.getExamByIsEntry(1).subscribe(data => {
      this.examInfo = data.json().data;
    });
  }

  onGetExamReport(item: string) {
    window.open('/oerts/exam/' + item + '/report/report.html');
  }
}
