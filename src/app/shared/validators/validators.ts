import {FormControl, FormGroup} from '@angular/forms';

export function usernameValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {usernameValid: {errorDesc: '姓名不能为空'}};
  } else {
    return null;
  }
}

export function userphoneValidator(control: FormControl): any {
  const phoneReq = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
  const valid = phoneReq.test(control.value);
  if (isEmpty(control.value)) {
    return {userphoneValid: {errorDesc: '手机号不能为空'}};
  } else {
    return valid ? null : {userphoneValid: {errorDesc: '手机号格式不正确'}};
  }
}

export function passwordValidator(group: FormGroup): any {
  const loginpassword: FormControl = group.get('loginpassword') as FormControl;
  const pconfirm: FormControl = group.get('pconfirm') as FormControl;
  if (isEmpty(loginpassword.value) || isEmpty(pconfirm.value)) {
    return {passwordValid: {errorDesc: '两次输入密码都不能为空'}};
  } else {
    if (loginpassword.value !== pconfirm.value) {
      return {passwordValid: {errorDesc: '两次输入密码不匹配'}};
    } else {
      return null;
    }
  }
}

export function idcardValidator(control: FormControl): any {
  const idcardReq = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const valid = idcardReq.test(control.value);
  if (isEmpty(control.value)) {
    return {idcardValid: {errorDesc: '身份证号不能为空'}};
  } else {
    return valid ? null : {idcardValid: {errorDesc: '身份证号格式不正确'}};
  }
}

export function emailaddressValidator(control: FormControl): any {
  const emailaddressReq = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const valid = emailaddressReq.test(control.value);
  if (isEmpty(control.value)) {
    return {emailaddressValid: {errorDesc: '邮箱地址不能为空'}};
  } else {
    return valid ? null : {emailaddressValid: {errorDesc: '邮箱地址格式不正确'}};
  }
}

export function residentialaddressValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {residentialaddressValid: {errorDesc: '居住地址不能为空'}};
  } else {
    return null;
  }
}

export function userprofessionValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {userprofessionValid: {errorDesc: '职业必须选择'}};
  } else {
    return null;
  }
}

export function usersexValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {usersexValid: {errorDesc: '性别必须选择'}};
  } else {
    return null;
  }
}

export function admissionticketValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {admissionticketValid: {errorDesc: '请输入正确的准考证号'}};
  } else {
    return null;
  }
}

export function examnameValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {examnameValid: {errorDesc: '考试名称不能为空'}};
  } else {
    return null;
  }
}

export function examtypeValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {examtypeValid: {errorDesc: '考试类型不能为空'}};
  } else {
    return null;
  }
}

export function costValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {costValid: {errorDesc: '报名费用不能为空'}};
  } else {
    if (control.value < 0 || control.value >= 10000) {
      return {costValid: {errorDesc: '报名费用超出范围'}};
    } else {
      return null;
    }
  }
}

export function maxnumValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {maxnumValid: {errorDesc: '报名人数上限不能为空'}};
  } else {
    if (control.value <= 0) {
      return {maxnumValid: {errorDesc: '报名人数上限超出范围'}};
    } else {
      return null;
    }
  }
}

export function totalscoreValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {totalscoreValid: {errorDesc: '考试总分数不能为空'}};
  } else {
    if (control.value <= 0 || control.value >= 1000) {
      return {totalscoreValid: {errorDesc: '考试总分数超出范围'}};
    } else {
      return null;
    }
  }
}

export function pasescoreValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {pasescoreValid: {errorDesc: '考试通过分数不能为空'}};
  } else {
    if (control.value <= 0 || control.value >= 1000) {
      return {pasescoreValid: {errorDesc: '考试通过分数超出范围'}};
    } else {
      return null;
    }
  }
}

export function regtimeValidator(group: FormGroup): any {
  const regtimefrom: FormControl = group.get('regtimefrom') as FormControl;
  const regtimeto: FormControl = group.get('regtimeto') as FormControl;
  if (isEmpty(regtimefrom.value) || isEmpty(regtimeto.value)) {
    return {regtimeValid: {errorDesc: '考试报名时间不能为空'}};
  } else {
    if (regtimefrom.value > regtimeto.value) {
      return {regtimeValid: {errorDesc: '考试报名前后时间大小错误'}};
    } else {
      if (regtimefrom.value.toString() === regtimeto.value.toString()) {
        return {regtimeValid: {errorDesc: '考试报名前后时间不能同一天'}};
      }
      return null;
    }
  }
}

export function examtimedayValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {examtimedayValid: {errorDesc: '考试日期不能为空'}};
  } else {
    return null;
  }
}

export function iscertificateValidator(control: FormControl): any {
  if (isEmpty(control.value)) {
    return {iscertificateValid: {errorDesc: '考试是否有证书必须选择'}};
  } else {
    return null;
  }
}

export function examplaceValidator(group: FormGroup): any {
  const examplacec: FormControl = group.get('examplacec') as FormControl;
  const examplaced: FormControl = group.get('examplaced') as FormControl;
  const examplacep: FormControl = group.get('examplacep') as FormControl;
  if (isEmpty(examplacec.value) || isEmpty(examplaced.value) || isEmpty(examplacep.value)) {
    return {examplaceValid: {errorDesc: '考试地点不能为空'}};
  } else {
    return null;
  }
}

export function examtimefm1Validator(group: FormGroup): any {
  const examtimefh1: FormControl = group.get('examtimefh1') as FormControl;
  const examtimefm1: FormControl = group.get('examtimefm1') as FormControl;
  const examtimeth1: FormControl = group.get('examtimeth1') as FormControl;
  const examtimetm1: FormControl = group.get('examtimetm1') as FormControl;
  if (isEmpty(examtimefh1.value) || isEmpty(examtimefm1.value) || isEmpty(examtimeth1.value) || isEmpty(examtimetm1.value)) {
    return {examtimefm1Valid: {errorDesc: '具体时间段不能有空'}};
  } else {
    if ((examtimefh1.value < 6 || examtimefh1.value > 23) ||
      (examtimeth1.value < 6 || examtimeth1.value > 23) ||
      (examtimefm1.value < 0 || examtimefm1.value > 59) ||
      (examtimetm1.value < 0 || examtimetm1.value > 59)) {
      return {examtimefm1Valid: {errorDesc: '分/时不在正确范围内'}};
    } else {
      if (examtimefh1.value > examtimeth1.value ||
        (examtimefh1.value === examtimeth1.value && examtimefm1.value >= examtimetm1.value)) {
        return {examtimefm1Valid: {errorDesc: '前后时间大小错误'}};
      } else {
        return null;
      }
    }
  }
}

export function examtimefm2Validator(group: FormGroup, isshow: boolean): any {
  const examtimefh2: FormControl = group.get('examtimefh2') as FormControl;
  const examtimefm2: FormControl = group.get('examtimefm2') as FormControl;
  const examtimeth2: FormControl = group.get('examtimeth2') as FormControl;
  const examtimetm2: FormControl = group.get('examtimetm2') as FormControl;

  if (isEmpty(examtimefh2.value) && isEmpty(examtimefm2.value) && isEmpty(examtimeth2.value) && isEmpty(examtimetm2.value)) {
    return null;
  }

  if (isEmpty(examtimefh2.value) || isEmpty(examtimefm2.value) || isEmpty(examtimeth2.value) || isEmpty(examtimetm2.value)) {
    return {examtimefm2Valid: {errorDesc: '具体时间段不能有空'}};
  } else {
    if ((examtimefh2.value < 6 || examtimefh2.value > 23) ||
      (examtimeth2.value < 6 || examtimeth2.value > 23) ||
      (examtimefm2.value < 0 || examtimefm2.value > 59) ||
      (examtimetm2.value < 0 || examtimetm2.value > 59)) {
      return {examtimefm2Valid: {errorDesc: '分/时不在正确范围内'}};
    } else {
      if (examtimefh2.value > examtimeth2.value ||
        (examtimefh2.value === examtimeth2.value && examtimefm2.value >= examtimetm2.value)) {
        return {examtimefm2Valid: {errorDesc: '前后时间大小错误'}};
      } else {
        return null;
      }
    }
  }
}

export function examtimefm3Validator(group: FormGroup): any {
  const examtimefh3: FormControl = group.get('examtimefh3') as FormControl;
  const examtimefm3: FormControl = group.get('examtimefm3') as FormControl;
  const examtimeth3: FormControl = group.get('examtimeth3') as FormControl;
  const examtimetm3: FormControl = group.get('examtimetm3') as FormControl;

  if (isEmpty(examtimefh3.value) && isEmpty(examtimefm3.value) && isEmpty(examtimeth3.value) && isEmpty(examtimetm3.value)) {
    return null;
  }

  if (isEmpty(examtimefh3.value) || isEmpty(examtimefm3.value) || isEmpty(examtimeth3.value) || isEmpty(examtimetm3.value)) {
    return {examtimefm3Valid: {errorDesc: '具体时间段不能有空'}};
  } else {
    if ((examtimefh3.value < 6 || examtimefh3.value > 23) ||
      (examtimeth3.value < 6 || examtimeth3.value > 23) ||
      (examtimefm3.value < 0 || examtimefm3.value > 59) ||
      (examtimetm3.value < 0 || examtimetm3.value > 59)) {
      return {examtimefm3Valid: {errorDesc: '分/时不在正确范围内'}};
    } else {
      if (examtimefh3.value > examtimeth3.value ||
        (examtimefh3.value === examtimeth3.value && examtimefm3.value >= examtimetm3.value)) {
        return {examtimefm3Valid: {errorDesc: '前后时间大小错误'}};
      } else {
        return null;
      }
    }
  }
}

function isEmpty(index: any) {
  return index === '' || index === null;
}
