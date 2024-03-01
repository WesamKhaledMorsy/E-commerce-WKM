import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Components/LoginRegister/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const _authS= inject(AuthService);
  const router = inject(Router)
  if(_authS.user_data.getValue() === null){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You must login first"
    });
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }
};
