import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Components/LoginRegister/auth.service';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const _authS= inject(AuthService);
  const router = inject(Router)
  if(_authS.user_data.getValue() === null){
    return true;
  }else{
    router.navigate(['/home']);
    return false;
  }
};
