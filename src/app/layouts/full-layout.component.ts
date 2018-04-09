import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  examInfo: any;
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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/oerts/exams').subscribe(data => {
      this.examInfo = data;
      // console.log(this.examInfo.length);
      this.examInfoLength = this.examInfo.length;
    })
  }
}
