import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BsDatepickerConfig, BsLocaleService, BsModalRef, BsModalService, defineLocale, zhCnLocale} from 'ngx-bootstrap';
import {
  costValidator, examnameValidator, examplaceValidator, examtimedayValidator, examtimefm1Validator, examtimefm2Validator,
  examtimefm3Validator, examtypeValidator, hallnumValidator,
  iscertificateValidator,
  maxnumValidator, pasescoreValidator,
  regtimeValidator,
  totalscoreValidator
} from '../../shared/validators/validators';
import {DatePipe} from '@angular/common';
import {ExamManagementService} from '../../service/exam-management.service';
import {Router} from '@angular/router';
import {ExamPlaceManagementService} from '../../service/exam-place-management.service';
import {ExamPlaceInfo} from '../../model/ExamPlaceInfo';

@Component({
  selector: 'app-test-entry',
  templateUrl: './test-entry.component.html',
  styleUrls: ['./test-entry.component.css']
})
export class TestEntryComponent implements OnInit {

  examModel: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  period2 = false;
  period3 = false;
  validStatus = true;
  cites: Array<ExamPlaceInfo> = new Array<ExamPlaceInfo>();
  districts: Array<ExamPlaceInfo> = new Array<ExamPlaceInfo>();
  places: Array<ExamPlaceInfo> = new Array<ExamPlaceInfo>();
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private fb: FormBuilder,
              private _localeService: BsLocaleService,
              private datePipe: DatePipe,
              private examManagementService: ExamManagementService,
              private router: Router,
              private examPMService: ExamPlaceManagementService,
              private modalService: BsModalService) {
    this.examModel = this.fb.group({
      examname: ['', examnameValidator],
      examtype: ['', examtypeValidator],
      cost: ['', costValidator],
      maxnum: ['', maxnumValidator],
      hallnum: ['', hallnumValidator],
      totalscore: ['', totalscoreValidator],
      pasescore: ['', pasescoreValidator],
      regTimeGroup: fb.group({
        regtimefrom: [''],
        regtimeto: [''],
      }, {validator: regtimeValidator}),
      examtimeday: ['', examtimedayValidator],
      iscertificate: ['', iscertificateValidator],
      examPlaceGroup: fb.group({
        examplacec: [''],
        examplaced: [''],
        examplacep: [''],
      }, {validator: examplaceValidator}),
      examintroduce: [''],
      examTimePeriod1: fb.group({
        examtimefh1: [''],
        examtimefm1: [''],
        examtimeth1: [''],
        examtimetm1: ['']
      }, {validator: examtimefm1Validator}),
      examTimePeriod2: fb.group({
        examtimefh2: [''],
        examtimefm2: [''],
        examtimeth2: [''],
        examtimetm2: [''],
      }, {validator: examtimefm2Validator}),
      examTimePeriod3: fb.group({
        examtimefh3: [''],
        examtimefm3: [''],
        examtimeth3: [''],
        examtimetm3: [''],
      }, {validator: examtimefm3Validator}),
    });
  }

  ngOnInit() {
    this.bsConfig = {containerClass: 'theme-blue', dateInputFormat: 'YYYY-MM-DD'};
    defineLocale('zh-cn', zhCnLocale);
    this._localeService.use('zh-cn');
    this.examPMService.getAllCity().subscribe(data => {
      this.cites = data.json().data;
    });
  }

  onPeriodRemove(item: number) {
    if (item === 2) {
      this.period2 = false;
    } else {
      this.period3 = false;
    }
  }

  onPeriodAdd() {
    if (this.period2) {
      this.period3 = true;
    } else {
      this.period2 = true;
    }
  }

  onExamAdd(temp: TemplateRef<any>) {
    if (this.examModel.valid) {
      const value = this.examModel.value;
      const period1Time = this.datePipe.transform(value.examtimeday, 'yyyy-MM-dd') + ' '
        + this.changeTimeNumberToString(value.examTimePeriod1.examtimefh1, value.examTimePeriod1.examtimefm1) + '~'
        + this.changeTimeNumberToString(value.examTimePeriod1.examtimeth1, value.examTimePeriod1.examtimetm1);
      let period2Time: string;
      let period3Time: string;
      // 选填的时间段2
      if (this.period2) {
        period2Time = this.datePipe.transform(value.examtimeday, 'yyyy-MM-dd') + ' '
          + this.changeTimeNumberToString(value.examTimePeriod2.examtimefh2, value.examTimePeriod2.examtimefm2) + '~'
          + this.changeTimeNumberToString(value.examTimePeriod2.examtimeth2, value.examTimePeriod2.examtimetm2);
      } else {
        period2Time = '';
      }
      // 选填的时间段3
      if (this.period3) {
        period3Time = this.datePipe.transform(value.examtimeday, 'yyyy-MM-dd') + ' '
          + this.changeTimeNumberToString(value.examTimePeriod3.examtimefh3, value.examTimePeriod3.examtimefm3) + '~'
          + this.changeTimeNumberToString(value.examTimePeriod3.examtimeth3, value.examTimePeriod3.examtimetm3);
      } else {
        period3Time = '';
      }
      // json拼接
      const body = {
        'examId': '',
        'examName': value.examname,
        'examType': value.examtype,
        'cost': value.cost,
        'maxNum': value.maxnum,
        'hallNum': value.hallnum,
        'examPlace': value.examPlaceGroup.examplacec + value.examPlaceGroup.examplaced + value.examPlaceGroup.examplacep,
        'examTimePeriod1': period1Time,
        'examTimePeriod2': period2Time,
        'examTimePeriod3': period3Time,
        'regTimeFrom': this.datePipe.transform(value.regTimeGroup.regtimefrom, 'yyyy-MM-dd'),
        'regTimeTo': this.datePipe.transform(value.regTimeGroup.regtimeto, 'yyyy-MM-dd'),
        'examIntroduce': value.examintroduce,
        'registNum': 0,
        'paseScore': value.pasescore,
        'totalScore': value.totalscore,
        'isCertificate': value.iscertificate
      };
      this.examManagementService.addExam(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.modalRef = this.modalService.show(temp, this.config);
        }
      });
    } else {
      this.validStatus = false;
    }
  }

  onReset() {
    this.validStatus = true;
    this.period3 = false;
    this.period2 = false;
    this.examModel.reset();
  }

  onEntrySuccess() {
    this.modalRef.hide();
    this.router.navigate(['/layout/test-info']);
  }

  changeTimeNumberToString(hour: number, min: number): string {

    let hour_str: string;
    let min_str: string;

    if (hour <= 9) {
      hour_str = '0' + hour;
    } else {
      hour_str = hour.toString();
    }
    if (min <= 9) {
      min_str = '0' + min;
    } else {
      min_str = min.toString();
    }
    return hour_str + ':' + min_str;
  }

  onGetDistrict() {
    this.examPMService.getDistrictByCity(this.examModel.value.examPlaceGroup.examplacec).subscribe(data => {
      this.districts = data.json().data;
    });
  }

  onGetPlace() {
    this.examPMService.getPlaceByDistrict(this.examModel.value.examPlaceGroup.examplaced).subscribe(data => {
      this.places = data.json().data;
    });
  }

}
