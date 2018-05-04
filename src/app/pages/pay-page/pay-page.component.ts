import {Component, OnInit} from '@angular/core';
import {PathKeyService} from '../../service/path-key.service';
import {ExamineeService} from '../../service/examinee.service';
import {ExamRegistrationService} from '../../service/exam-registration.service';
import {Router} from '@angular/router';

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

  constructor(private pathKeyService: PathKeyService,
              private examineeService: ExamineeService,
              private examRService: ExamRegistrationService,
              private router: Router) {
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

  onPay() {
    const body = {
      'cost': this.cost,
      'idCard': sessionStorage.getItem('user_idcard'),
      'examId': this.examId
    };
    this.examRService.updatePayRegistration(body).subscribe(data => {
      if (data.json().status === 'success') {
        alert('支付成功');
        this.router.navigate(['/layout/test-complete']);
      }
    });
  }

}
