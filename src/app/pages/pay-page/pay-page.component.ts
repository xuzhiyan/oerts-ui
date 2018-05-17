import {Component, OnInit, TemplateRef} from '@angular/core';
import {PathKeyService} from '../../service/path-key.service';
import {ExamineeService} from '../../service/examinee.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent implements OnInit {

  examId: string;
  examName: string;
  cost: number;
  balance: number;
  canPay: boolean;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private pathKeyService: PathKeyService,
              private examineeService: ExamineeService,
              private examRService: ExamRegistrationService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.examId = this.pathKeyService.examId;
    this.examName = this.pathKeyService.examName;
    this.cost = this.pathKeyService.cost;
    this.examineeService.getBalanceByUserPhone(sessionStorage.getItem('user_validate')).subscribe(data => {
      this.balance = data.json().data;
      this.canPay = this.balance >= this.cost;
    });
  }

  onPay(temp: TemplateRef<any>) {
    const body = {
      'cost': this.cost,
      'idCard': sessionStorage.getItem('user_idcard'),
      'examId': this.examId
    };
    this.examRService.updatePayRegistration(body).subscribe(data => {
      if (data.json().status === 'success') {
        this.modalRef = this.modalService.show(temp, this.config);
      }
    });
  }

  afterPay() {
    this.modalRef.hide();
    this.router.navigate(['/layout/test-complete']);
  }

}
