import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {
  emailaddressValidator, idcardValidator, residentialaddressValidator, usernameValidator,
  userprofessionValidator, usersexValidator
} from '../../shared/validators/validators';
import {ExamineeService} from '../../service/examinee.service';
import {ImagesService} from '../../service/images.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-edit-personinf',
  templateUrl: './edit-personinf.component.html',
  styleUrls: ['./edit-personinf.component.css']
})
export class EditPersoninfComponent implements OnInit {

  imageMessage: string;
  imageStatus: boolean;
  validStatus: boolean;
  editModel: FormGroup;
  imagesPath: any;
  savePath: string;

  constructor(private fb: FormBuilder,
              private examineeService: ExamineeService,
              private imagesService: ImagesService,
              private sanitizer: DomSanitizer) {
    this.editModel = fb.group({
      username: ['', usernameValidator],
      usersex: ['', usersexValidator],
      idcard: ['', idcardValidator],
      userprofession: ['', userprofessionValidator],
      emailaddress: ['', emailaddressValidator],
      residentialaddress: ['', residentialaddressValidator],
      userphoto: [''],
    })
  }

  ngOnInit() {
    this.imagesPath = sessionStorage.getItem('user_photo');
    this.validStatus = true;
    this.imageStatus = true;
    this.examineeService.getByUserPhone(sessionStorage.getItem('user_validate')).subscribe(data => {
      this.editModel.setValue({
        username: data.json().data.userName,
        usersex: data.json().data.userSex.toString(),
        idcard: data.json().data.idCard,
        userprofession: data.json().data.userProfession,
        emailaddress: data.json().data.emailAddress,
        residentialaddress: data.json().data.residentialAddress,
        userphoto: '',
      });
    });
  }

  onEdit() {
    if (this.editModel.valid && this.imagesPath !== 'assets/img/timg.jpg' && this.imageStatus) {
      if (this.savePath === undefined) {
        this.savePath = this.imagesPath;
      }
      // 用户信息更新
      const body = {
        'userName': this.editModel.value.username,
        'userPhone': sessionStorage.getItem('user_validate'),
        'userSex': this.editModel.value.usersex,
        'idCard': this.editModel.value.idcard,
        'userProfession': this.editModel.value.userprofession,
        'emailAddress': this.editModel.value.emailaddress,
        'residentialAddress': this.editModel.value.residentialaddress,
        'userPhoto': this.savePath
      };
      this.examineeService.updateByUserPhone(body).subscribe(res => {
        if (res.json().status === 'success') {
          // 更新session里面的信息
          sessionStorage.setItem('user_photo', this.savePath);
          sessionStorage.setItem('user_name', this.editModel.value.username);
          sessionStorage.setItem('user_idcard', this.editModel.value.idcard);
          alert('更新成功！');
        } else {
          alert('更新失败！');
        }
      });
    } else {
      if (this.imagesPath === 'assets/img/timg.jpg') {
        this.imageStatus = false;
        this.imageMessage = '图片必须上传';
      }
      this.validStatus = false;
    }
  }

  onReset() {
    this.imageStatus = true;
    this.validStatus = true;
    this.editModel.reset();
  }

  onFileChange(event) {
    const fileList = event.target.files;
    const file: File = fileList[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      this.imagesPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      this.imageStatus = true;

      // 图片上传
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userPhone', sessionStorage.getItem('user_validate'));
      formData.append('fileName', 'user_Photo');
      this.imagesService.upLoadImages(formData).subscribe(data => {
        if (data.json().status === 'success') {
          this.savePath = '/oerts/images/' + sessionStorage.getItem('user_validate') + '/user_Photo' + data.json().data;
        }
      });
    } else {
      this.imageStatus = false;
      this.imageMessage = '图片格式不正确';
    }
  }

}
