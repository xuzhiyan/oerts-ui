import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {emailaddressValidator, idcardValidator, usernameValidator, userphoneValidator} from '../../shared/validators';


@Component({
  selector: 'app-edit-personinf',
  templateUrl: './edit-personinf.component.html',
  styleUrls: ['./edit-personinf.component.css']
})
export class EditPersoninfComponent implements OnInit {

  validStatus: boolean;
  editModel: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editModel = fb.group({
      username: ['', usernameValidator],
      userphone: ['', userphoneValidator],
      idcard: ['', idcardValidator],
      userprofession: [''],
      emailaddress: ['', emailaddressValidator],
      residentialaddress: [''],
      userphoto: [''],
      idcardphoto: ['']
    })
  }

  ngOnInit() {
    this.validStatus = true;
  }

  onEdit() {
    // console.log(this.editModel.value.userphone);
    if (this.editModel.valid) {

    } else {
      this.validStatus = false;
    }
  }

  onReset() {
    this.validStatus = true;
    this.editModel.reset();
  }
}
