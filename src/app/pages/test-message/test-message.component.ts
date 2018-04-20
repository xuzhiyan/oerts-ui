import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-message',
  templateUrl: './test-message.component.html',
  styleUrls: ['./test-message.component.css']
})
export class TestMessageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
