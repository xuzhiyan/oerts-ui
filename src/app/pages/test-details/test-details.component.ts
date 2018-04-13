import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  examId: string;
  examInfo: Array<ExamInfo> = new Array();

  constructor(private routeInfo: ActivatedRoute,
              private examService: ExamManagementService,
              private router: Router) {
  }

  ngOnInit() {
    this.examId = this.routeInfo.snapshot.params['id'];
    this.examService.getExamById(this.examId).subscribe(data => {
      this.examInfo = data.json();
    })
  }

  onReturn() {
    this.router.navigate(['/layout/test-registration']);
  }
}
