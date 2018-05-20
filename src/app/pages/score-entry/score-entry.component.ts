import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExamInfo} from '../../model/ExamInfo';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/ExamineeRegistInfo';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

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
  skipInfo: string;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private examService: ExamManagementService,
              private examRService: ExamRegistrationService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.showEntryInfo = true;
    this.isNoInfo = true;
    this.examService.getExamByIsEntry(0).subscribe(data => {
      this.examInfo = data.json().data;
    });
  }

  onGetEntryList(examId: string, skip: TemplateRef<any>) {
    if (!this.showEntryInfo) {
      this.skipInfo = examId;
      this.modalRef = this.modalService.show(skip, this.config);
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

  onEntryScore(temp: TemplateRef<any>) {
    this.examRService.entryScore(this.examEntryInfo).subscribe(value => {
      this.examService.getExamByIsEntry(0).subscribe(data => {
        this.modalRef = this.modalService.show(temp, this.config);
        this.showEntryInfo = true;
        this.examInfo = data.json().data;
      });
    });
  }

  skipOther() {
    this.examRService.getScoreEntryListById(this.skipInfo).subscribe(data => {
      this.modalRef.hide();
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
