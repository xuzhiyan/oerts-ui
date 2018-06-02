import {CanActivate} from '@angular/router';

export class RootGuard implements CanActivate {
  canActivate() {
    const userValidate = sessionStorage.getItem('user_validate');
    if (userValidate === 'root') {
      return true;
    } else {
      return false;
    }
  }
}
