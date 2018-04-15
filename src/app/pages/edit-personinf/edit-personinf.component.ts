import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {
  emailaddressValidator, idcardValidator, residentialaddressValidator, usernameValidator,
  userphoneValidator, userprofessionValidator, usersexValidator
} from '../../shared/validators/validators';
import {ExamineeService} from '../../service/examinee.service';
import {ExamInfo} from '../../model/ExamInfo';


@Component({
  selector: 'app-edit-personinf',
  templateUrl: './edit-personinf.component.html',
  styleUrls: ['./edit-personinf.component.css']
})
export class EditPersoninfComponent implements OnInit {

  validStatus: boolean;
  editModel: FormGroup;

  constructor(private fb: FormBuilder,
              private examineeService: ExamineeService) {
    this.editModel = fb.group({
      username: ['', usernameValidator],
      userphone: ['', userphoneValidator],
      usersex: ['', usersexValidator],
      idcard: ['', idcardValidator],
      userprofession: ['', userprofessionValidator],
      emailaddress: ['', emailaddressValidator],
      residentialaddress: ['', residentialaddressValidator],
      userphoto: [''],
      idcardphoto: ['']
    })
  }

  ngOnInit() {
    this.validStatus = true;
    this.examineeService.getByUserPhone(sessionStorage.getItem('user_validate')).subscribe(data => {
      this.editModel.setValue({
        username: data.json().data.userName,
        userphone: data.json().data.userPhone,
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

  onEdit() {
    console.log(this.editModel.value.usersex);
    console.log(this.editModel.value.userprofession);
    if (this.editModel.valid) {
      const body = {
        'userName': this.editModel.value.username,
        'userPhone': this.editModel.value.userphone,
        'userSex': this.editModel.value.usersex,
        'idCard': this.editModel.value.idcard,
        'userProfession': this.editModel.value.userprofession,
        'emailAddress': this.editModel.value.emailaddress,
        'residentialAddress': this.editModel.value.residentialaddress,
      };
      this.examineeService.updateByUserPhone(body).subscribe(data => {
        if (data.json().status === 'success') {
          alert('更新成功！');
        } else {
          alert('更新失败！');
        }
      });
    } else {
      this.validStatus = false;
    }
  }

  onReset() {
    this.validStatus = true;
    this.editModel.reset();
  }
}
