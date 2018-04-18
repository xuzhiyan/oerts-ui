import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../service/exam-management.service';
import {ExamInfo} from '../model/ExamInfo';
import {ExamRegistrationService} from '../service/exam-registration.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  examInfoLength: number;
  completeRExamInfoLength: number;

  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor(private examService: ExamManagementService,
              private examRService: ExamRegistrationService) {
  }

  ngOnInit(): void {
    this.examService.getAllExams().subscribe(data => {
      this.examInfoLength = data.json().data.length;
    });
    this.examRService.completeResgistList(sessionStorage.getItem('user_idcard')).subscribe(data => {
      this.completeRExamInfoLength = data.json().data.length;
    })
    // console.log(sessionStorage.getItem('user_validate'));
    // console.log(sessionStorage.getItem('user_idcard'));
  }
}
