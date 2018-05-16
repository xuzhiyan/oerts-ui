import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {rechargeNumValidator} from '../../shared/validators/validators';
import {AlipayService} from '../../service/alipay.service';
import {ExamineeService} from '../../service/examinee.service';

@Component({
  selector: 'app-pay-recharge',
  templateUrl: './pay-recharge.component.html',
  styleUrls: ['./pay-recharge.component.css']
})
export class PayRechargeComponent implements OnInit {

  balance: number;
  payModel: FormGroup;
  qrCode: string;
  qrSize: string;
  outTradeNo: string;
  validStatus = true;
  timeSet: any;
  modalRef1: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private modalService: BsModalService,
              private fb: FormBuilder,
              private alipayService: AlipayService,
              private examineeService: ExamineeService) {
    this.payModel = this.fb.group({
      rechargeNum: ['', rechargeNumValidator]
    });
  }

  ngOnInit() {
    this.qrSize = '150';
    this.examineeService.getBalanceByUserPhone(sessionStorage.getItem('user_validate')).subscribe(data => {
      this.balance = data.json().data;
    });
  }

  onShowQrCode(temp: TemplateRef<any>, success: TemplateRef<any>) {
    if (this.payModel.valid) {
      const body = {
        'userPhone': sessionStorage.getItem('user_validate'),
        'rechargeNum': this.payModel.value.rechargeNum
      };
      this.alipayService.rechargeBalance(body).subscribe(data => {
        if (data.json().status === 'success') {
          this.qrCode = data.json().data.qrCode;
          this.outTradeNo = data.json().data.outTradeNo;
          this.modalRef1 = this.modalService.show(temp, this.config);

          // 轮询查看用户是否付款
          const that = this;
          this.timeSet = setInterval(function () {
            const body2 = {
              'outTradeNo': that.outTradeNo,
              'userPhone': sessionStorage.getItem('user_validate'),
              'rechargeNum': that.payModel.value.rechargeNum + that.balance
            };
            that.alipayService.getQueryInfo(body2).subscribe(value => {
              if (value.json().status === 'success') {
                // 充值成功后进行的操作
                // 关闭二维码界面
                that.modalRef1.hide();
                // 显示成功模态框
                that.modalRef1 = that.modalService.show(success, that.config);
                clearInterval(that.timeSet);
                // 更新页面上的余额
                that.examineeService.getBalanceByUserPhone(sessionStorage.getItem('user_validate')).subscribe(result => {
                  that.balance = result.json().data;
                });
                that.payModel.reset();
              }
            });
          }, 5000);

        }
      });
    } else {
      this.validStatus = false;
    }
  }

  onCloseQrCode() {
    this.modalRef1.hide();
    clearInterval(this.timeSet);
  }

}
