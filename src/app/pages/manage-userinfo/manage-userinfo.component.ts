import {Component, OnInit} from '@angular/core';
import {ExamineeInfo} from '../../model/ExamineeInfo';
import {ExamineeService} from '../../service/examinee.service';

@Component({
  selector: 'app-manage-userinfo',
  templateUrl: './manage-userinfo.component.html',
  styleUrls: ['./manage-userinfo.component.css']
})
export class ManageUserinfoComponent implements OnInit {

  examineeInfo: Array<ExamineeInfo>

  constructor(private examineeService: ExamineeService) {
  }

  ngOnInit() {
    this.examineeService.getAllExaminee().subscribe(data => {
      if (data.json().status === 'success') {
        this.examineeInfo = data.json().data;
      }
    });
  }

}
