import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ExamineeService} from '../../service/examinee.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {PathKeyService} from '../../service/path-key.service';

@Component({
  selector: 'app-test-improveinfo',
  templateUrl: './test-improveinfo.component.html',
  styleUrls: ['./test-improveinfo.component.css']
})
export class TestImproveinfoComponent implements OnInit {

  examId: string;
  examName: string;
  registExamModel: FormGroup;
  imagesPath: string;

  constructor(private fb: FormBuilder,
              private examineeService: ExamineeService,
              private router: Router,
              private examRService: ExamRegistrationService,
              private pathKeyService: PathKeyService) {
    this.registExamModel = fb.group({
      username: [{value: '', disabled: true}],
      usersex: [{value: '', disabled: true}],
      idcard: [{value: '', disabled: true}],
      userprofession: [{value: '', disabled: true}],
      emailaddress: [{value: '', disabled: true}],
      residentialaddress: [{value: '', disabled: true}],
      userphoto: [''],
      idcardphoto: ['']
    })
  }

  ngOnInit() {
    this.imagesPath = sessionStorage.getItem('user_photo');
    this.examId = this.pathKeyService.examId;
    this.examName = this.pathKeyService.examName;
    this.examineeService.getByUserPhone(sessionStorage.getItem('user_validate')).subscribe(data => {
      this.registExamModel.setValue({
        username: data.json().data.userName,
        usersex: data.json().data.userSex.toString(),
        idcard: data.json().data.idCard,
        userprofession: data.json().data.userProfession,
        emailaddress: data.json().data.emailAddress,
        residentialaddress: data.json().data.residentialAddress,
        userphoto: '',
        idcardphoto: ''
      })
    });
  }

  onSubmitInfo() {
    this.examRService.examRegistByIdCardAndExamID(this.examId, sessionStorage.getItem('user_idcard')).subscribe(data => {
      if (data.json().status === 'success') {
        this.router.navigate(['/layout/test-message']);
      } else {
        alert('报名失败');
      }
    });
  }

}
