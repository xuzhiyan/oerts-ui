import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamManagementService} from '../service/exam-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  examInfoLength: number;

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

  constructor(private http: HttpClient,
              private examService: ExamManagementService) {
  }

  ngOnInit(): void {
    this.examService.getAllExams().subscribe(data => {
      const examInfo: any = data;
      this.examInfoLength = examInfo.length;
    })
  }
}
