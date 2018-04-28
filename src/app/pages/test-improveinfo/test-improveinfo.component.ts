import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ExamineeService} from '../../service/examinee.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {PathKeyService} from '../../service/path-key.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ImagesService} from '../../service/images.service';

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
  idCardFrontPath: any;
  idCardBackPath: any;
  frontMessage: string;
  backMessage: string;
  frontStatus: boolean;
  backStatus: boolean;
  imagesType: string;

  constructor(private fb: FormBuilder,
              private examineeService: ExamineeService,
              private router: Router,
              private examRService: ExamRegistrationService,
              private pathKeyService: PathKeyService,
              private sanitizer: DomSanitizer,
              private imagesService: ImagesService) {
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
    this.idCardFrontPath = 'assets/img/front.png';
    this.idCardBackPath = 'assets/img/back.png';
    this.frontStatus = true;
    this.backStatus = true;
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
      });
    });
  }

  onSubmitInfo() {
    if (this.idCardFrontPath === 'assets/img/front.png') {
      this.frontStatus = false;
      this.frontMessage = '身份证正面必须上传';
    }
    if (this.idCardBackPath === 'assets/img/back.png') {
      this.backStatus = false;
      this.backMessage = '身份证反面必须上传';
    }

    if (this.frontStatus && this.backStatus) {
      const body = {
        'examId': this.examId,
        'idCard': sessionStorage.getItem('user_idcard'),
        'idCardFront': sessionStorage.getItem('user_validate') + '\\' + this.examId + 'front' + this.imagesType,
        'idCardBack': sessionStorage.getItem('user_validate') + '\\' + this.examId + 'back' + this.imagesType
      };
      this.examRService.examRegistByIdCardAndExamID(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.router.navigate(['/layout/test-message']);
        } else {
          alert('报名失败');
        }
      });
    }
  }

  onFileChange(event, item: string) {
    const fileList = event.target.files;
    const file: File = fileList[0];

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (item === 'front') {
        this.idCardFrontPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        this.frontStatus = true;
      } else {
        this.idCardBackPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        this.backStatus = true;
      }

      // 图片上传
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userPhone', sessionStorage.getItem('user_validate'));
      formData.append('fileName', this.examId + item);
      this.imagesService.upLoadImages(formData).subscribe(data => {
        if (data.json().status === 'success') {
          this.imagesType = data.json().data;
        }
      });
    } else {
      if (item === 'front') {
        this.frontStatus = false;
        this.frontMessage = '身份证正面格式不正确';
      } else {
        this.backStatus = false;
        this.backMessage = '身份证反面格式不正确';
      }
    }
  }

}
