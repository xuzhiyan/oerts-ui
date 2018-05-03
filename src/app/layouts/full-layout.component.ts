import {Component, OnInit} from '@angular/core';
import {ExamManagementService} from '../service/exam-management.service';
import {ExamInfo} from '../model/ExamInfo';
import {ExamRegistrationService} from '../service/exam-registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  examInfoLength: number;
  completeRExamInfoLength: number;
  unpaidExamInfoLehgth: number;
  userName: string;
  userPhotoPath: string;
  isRootIdentify: boolean;

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
              private examRService: ExamRegistrationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isRootIdentify = sessionStorage.getItem('user_validate') === 'root';
    this.examService.getAllExams().subscribe(data => {
      this.examInfoLength = data.json().data.length;
    });
    const idCard = sessionStorage.getItem('user_idcard');
    if (idCard !== '') {
      if (idCard !== 'root') {
        this.examRService.completeResgistList(idCard).subscribe(data => {
          this.completeRExamInfoLength = data.json().data.length;
        });
        this.examRService.getPayList(idCard, '10').subscribe(data => {
          this.unpaidExamInfoLehgth = data.json().data.length;
        });
      }
    }
    // console.log(sessionStorage.getItem('user_validate'));
    // console.log(sessionStorage.getItem('user_idcard'));
    // console.log(sessionStorage.getItem('uesr_photo'));
    this.userName = sessionStorage.getItem('user_name');
    this.userPhotoPath = sessionStorage.getItem('user_photo');
  }

  onExit() {
    sessionStorage.clear();
  }
}
