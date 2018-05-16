import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';
import {PathKeyService} from '../../service/path-key.service';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css'],
})
export class TestRegistrationComponent implements OnInit {

  examInfo: Array<ExamInfo> = new Array();
  dangerMessage: boolean;
  isShowExamInfo: boolean;

  constructor(private examService: ExamManagementService,
              private router: Router,
              private pathKeyService: PathKeyService) {
  }

  ngOnInit() {
    this.dangerMessage = true;
    this.isShowExamInfo = false;
    if (sessionStorage.getItem('user_idcard') === '') {
      this.dangerMessage = false;
    }
  }

  onDetails(item: any) {
    if (sessionStorage.getItem('user_idcard') === '') {
      alert('请先完善用户信息后再报名！');
    } else {
      this.pathKeyService.examId = item.examId;
      this.router.navigate(['/layout/test-details']);
    }
  }

  onGetExamInfo(examType: string) {
    this.examService.getExamByType(examType).subscribe(data => {
      this.examInfo = data.json().data;
      this.isShowExamInfo = this.examInfo.length !== 0;
    });
  }
}
