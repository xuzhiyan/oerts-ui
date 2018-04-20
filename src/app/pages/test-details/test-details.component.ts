import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {PathKeyService} from '../../service/path-key.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  examId: string;
  examInfo: Array<ExamInfo> = new Array();
  // 用于不能重复报名的检查
  dangerMessage: boolean;

  constructor(private pathKeyService: PathKeyService,
              private routeInfo: ActivatedRoute,
              private examService: ExamManagementService,
              private router: Router,
              private examRService: ExamRegistrationService) {
  }

  ngOnInit() {
    this.dangerMessage = true;
    this.examId = this.pathKeyService.examId;
    if (this.examId !== null) {
      this.examService.getExamById(this.examId).subscribe(data => {
        this.examInfo = data.json().data;
      });
      this.examRService.countByIdCardAndExamID(this.examId, sessionStorage.getItem('user_idcard')).subscribe(data => {
        // console.log(data.json().status);
        if (data.json().status === 'failed') {
          this.dangerMessage = false;
        }
      });
    }
  }

  onExamRegistration(id: string, name: string) {
    // this.examRService.examRegistByIdCardAndExamID(this.examId, sessionStorage.getItem('user_idcard')).subscribe(data => {
    //   if (data.json().status === 'success') {
    //     alert('报名成功');
    //   } else {
    //     alert('报名失败');
    //   }
    // });
    this.pathKeyService.examId = id;
    this.pathKeyService.examName = name;
    this.router.navigate(['/layout/test-improveinfo']);
  }
}
