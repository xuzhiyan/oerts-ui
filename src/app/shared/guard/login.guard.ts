import {CanActivate} from '@angular/router';

export class LoginGuard implements CanActivate {

  canActivate() {
    const userValidate = sessionStorage.getItem('user_validate');
    if (userValidate !== null && userValidate !== '') {
      return true;
    } else {
      return false;
    }
  }
}
