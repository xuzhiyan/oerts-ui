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

function isEmpty(index: any) {
  return index === '' || index === null;
}