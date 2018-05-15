import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ExamRegistrationService} from '../../service/exam-registration.service';

@Component({
  selector: 'app-score-inquiry',
  templateUrl: './score-inquiry.component.html',
  styleUrls: ['./score-inquiry.component.css']
})
export class ScoreInquiryComponent implements OnInit {

  errorInfo: boolean;
  scoreInfo: boolean;
  isCertificateShow: boolean;
  searchModel: FormGroup;
  examName: string;
  score: number;
  examId: string;
  admissionTicket: string;

  constructor(private fb: FormBuilder,
              private examRService: ExamRegistrationService) {
    this.searchModel = fb.group({
      admissionticket: ['']
    });
  }

  ngOnInit() {
    this.scoreInfo = true;
    this.errorInfo = true;
    this.isCertificateShow = false;
  }

  onSearchScore() {
    if (this.searchModel.value.admissionticket === '') {
      this.scoreInfo = true;
      this.errorInfo = false;
    } else {
      this.examRService.getScoreByAdmissionTicket(this.searchModel.value.admissionticket).subscribe(data => {
        if (data.json().status === 'success') {
          this.examName = data.json().data.examName;
          this.score = data.json().data.score;
          this.examId = data.json().data.examId;
          this.admissionTicket = this.searchModel.value.admissionticket;
          if (data.json().data.isCertificate === '0' || data.json().data.paseScore > data.json().data.score) {
            this.isCertificateShow = false;
          } else {
            this.isCertificateShow = true;
          }
          this.scoreInfo = false;
          this.errorInfo = true;
        } else {
          this.scoreInfo = true;
          this.errorInfo = false;
        }
      });
    }
  }

  onGetScoreReport() {
    window.open('/oerts/exam/' + this.examId + '/scoreReport/' + this.admissionTicket + '.html');
  }

  onGetCertificate() {
    window.open('/oerts/exam/' + this.examId + '/certificate/' + this.admissionTicket + '.html');
  }

}
