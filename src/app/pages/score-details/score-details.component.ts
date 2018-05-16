import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {ExcelService} from '../../service/excel.service';

@Component({
  selector: 'app-score-details',
  templateUrl: './score-details.component.html',
  styleUrls: ['./score-details.component.css']
})
export class ScoreDetailsComponent implements OnInit {

  examInfo: Array<ExamInfo>;

  constructor(private examService: ExamManagementService,
              private excelService: ExcelService) {
  }

  ngOnInit() {
    this.examService.getExamByIsEntry(1).subscribe(data => {
      this.examInfo = data.json().data;
    });
  }

  onGetExamReport(item: string) {
    window.open('/oerts/exam/' + item + '/examReport/report.html');
  }

  onGetExcel(examId: string) {
    this.excelService.getScoreExcelById(examId).subscribe(data => {
      if (data.json().status === 'success') {
        window.open('/oerts/exam/' + examId + '/' + 'scoreInfo.xls');
      }
    });
  }
}
