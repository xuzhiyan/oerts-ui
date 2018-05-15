import {Component, OnInit} from '@angular/core';
import {ExamInfo} from '../../model/ExamInfo';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/ExamineeRegistInfo';

@Component({
  selector: 'app-score-entry',
  templateUrl: './score-entry.component.html',
  styleUrls: ['./score-entry.component.css']
})
export class ScoreEntryComponent implements OnInit {

  examInfo: Array<ExamInfo>;
  examEntryInfo: Array<CompleteRegistExamInfo>;
  showEntryInfo: boolean;
  isNoInfo: boolean;

  constructor(private examService: ExamManagementService,
              private examRService: ExamRegistrationService) {
  }

  ngOnInit() {
    this.showEntryInfo = true;
    this.isNoInfo = true;
    this.examService.getExamByIsEntry(0).subscribe(data => {
      this.examInfo = data.json().data;
    });
  }

  onGetEntryList(examId: string) {
    if (!this.showEntryInfo) {
      if (window.confirm('是否放弃当前录入的信息？')) {
        this.examRService.getScoreEntryListById(examId).subscribe(data => {
          if (data.json().data.length === 0) {
            this.showEntryInfo = true;
            this.isNoInfo = false;
          } else {
            this.examEntryInfo = data.json().data;
            this.showEntryInfo = false;
            this.isNoInfo = true;
          }
        });
      }
    } else {
      this.examRService.getScoreEntryListById(examId).subscribe(data => {
        if (data.json().data.length === 0) {
          this.showEntryInfo = true;
          this.isNoInfo = false;
        } else {
          this.examEntryInfo = data.json().data;
          this.showEntryInfo = false;
          this.isNoInfo = true;
        }
      });
    }
  }

  onEntryScore() {
    this.examRService.entryScore(this.examEntryInfo).subscribe(value => {
      alert('更新成功');
      this.showEntryInfo = true;
      this.examService.getExamByIsEntry(0).subscribe(data => {
        this.examInfo = data.json().data;
      });
    });
  }

}
