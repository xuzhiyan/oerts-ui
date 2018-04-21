import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {admissionticketValidator} from '../../shared/validators/validators';

@Component({
  selector: 'app-score-inquiry',
  templateUrl: './score-inquiry.component.html',
  styleUrls: ['./score-inquiry.component.css']
})
export class ScoreInquiryComponent implements OnInit {

  errorInfo: boolean;
  scoreInfo: boolean;
  searchModel: FormGroup;
  examName: string;
  score: number;

  constructor(private fb: FormBuilder,
              private examRService: ExamRegistrationService) {
    this.searchModel = fb.group({
      admissionticket: ['', admissionticketValidator]
    });
  }

  ngOnInit() {
    this.scoreInfo = true;
    this.errorInfo = true;
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
          this.scoreInfo = false;
          this.errorInfo = true;
        } else {
          this.scoreInfo = true;
          this.errorInfo = false;
        }
      });
    }

  }

}
