import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  examId: string;

  constructor(private routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.examId = this.routeInfo.snapshot.params['id'];
    console.log(this.examId);
  }

}
