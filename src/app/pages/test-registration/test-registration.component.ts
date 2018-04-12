import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../../service/exam-management.service';
import {ExamInfo} from '../../model/ExamInfo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.css'],
})
export class TestRegistrationComponent implements OnInit {

  examInfo: Array<ExamInfo> = new Array();

  constructor(private examService: ExamManagementService,
              private router: Router) {
  }

  ngOnInit() {
    // this.http.get('/oerts/exams').subscribe(data => {
    //   console.log(data);
    //   this.examInfo = data;
    //   console.log(this.examInfo);
    // })

    this.examService.getAllExams().subscribe(data => {
      this.examInfo = data.json();
    });

    // this.http.get<ExamInfo>('/oerts/exams').subscribe((data: ExamInfo) => this.examInfo = { ...data});

    // this.http.get<ExamInfo>('/oerts/exams').subscribe((data: ExamInfo) => this.examInfo = {
    //   examId: data[`examId`],
    //   examName: data[`examName`],
    //   cost: data[`cost`],
    //   maxNum: data[`maxNum`],
    //   examPlace: data[`examPlace`],
    //   examTimeFrom: data[`examTimeFrom`],
    //   examTimeTo: data[`examTimeTo`],
    //   regTimeFrom: data[`regTimeFrom`],
    //   regTimeTo: data[`regTimeTo`]
    // });
    // console.log(this.examInfo.cost);

    // this.httpt.get('/oerts/exams').subscribe(data => {
    //   this.test = data.json();
    //   console.log('########### this.test', this.test[0].examId);
    // });
  }

  onDetails(item: any) {
    // console.log(item);
    this.router.navigate(['/layout/test-details', item.examId]);
  }
}
