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

function isEmpty(index: any) {
  return index === '' || index === null;
}
