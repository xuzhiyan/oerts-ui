import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExamInfo} from '../../model/ExamInfo';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {CompleteRegistExamInfo} from '../../model/ExamineeRegistInfo';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ExcelService} from '../../service/excel.service';

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
  modalRef1: BsModalRef;
  file: File;
  isSelectFile: boolean;
  examId: string;
  showExcelMessage: boolean;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private examService: ExamManagementService,
              private examRService: ExamRegistrationService,
              private modalService: BsModalService,
              private excelService: ExcelService) {
  }

  ngOnInit() {
    this.showExcelMessage = true;
    this.isSelectFile = false;
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

  onUploadExcel(temp: TemplateRef<any>, examId: string) {
    this.examId = examId;
    this.modalRef1 = this.modalService.show(temp, this.config);
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

  onChangeFile(event) {
    const fileList = event.target.files;
    this.file = fileList[0];
    this.isSelectFile = true;
    this.showExcelMessage = true;
  }

  uploadToServer(success: TemplateRef<any>, failed: TemplateRef<any>) {
    if (this.isSelectFile) {
      // 文件上传
      const formData = new FormData();
      formData.append('excel', this.file);
      formData.append('examId', this.examId);
      this.excelService.uploadScoreExcel(formData).subscribe(data => {
        if (data.json().data === 0) {
          // 更新失败
          this.modalRef = this.modalService.show(failed, this.config);
          this.isSelectFile = false;
        } else {
          this.examService.getExamByIsEntry(0).subscribe(value => {
            this.examInfo = value.json().data;
            this.modalRef1.hide();
            this.modalRef = this.modalService.show(success, this.config);
            this.isSelectFile = false;
          });
        }
      });
    } else {
      this.showExcelMessage = false;
    }
  }

  onCloseUpload() {
    this.modalRef1.hide();
    this.showExcelMessage = true;
  }

}
