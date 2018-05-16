import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';
import {PathKeyService} from '../../service/path-key.service';
import {DatePipe} from '@angular/common';
import {ExcelService} from '../../service/excel.service';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.css']
})
export class TestInfoComponent implements OnInit {

  examInfo: Array<ExamInfo> = new Array();
  isShowExamInfo: boolean;
  nowDay: string;

  constructor(private examService: ExamManagementService,
              private router: Router,
              private pathKeyService: PathKeyService,
              private datePipe: DatePipe,
              private excelService: ExcelService) {
  }

  ngOnInit() {
    this.isShowExamInfo = false;
    const day = new Date();
    this.nowDay = this.datePipe.transform(day, 'yyyy-MM-dd');
  }

  onDetails(item: any) {
    this.pathKeyService.examId = item.examId;
    this.router.navigate(['/layout/test-details']);
  }

  onGetExamInfo(examType: string) {
    this.examService.getAllExams(examType).subscribe(data => {
      this.examInfo = data.json().data;
      this.isShowExamInfo = this.examInfo.length !== 0;
    });
  }

  onGetExcel(examId: string) {
    this.excelService.getExamineeExcelById(examId).subscribe(data => {
      if (data.json().status === 'success') {
        window.open('/oerts/exam/' + examId + '/' + 'examineeInfo.xls');
      }
    });
  }
}
