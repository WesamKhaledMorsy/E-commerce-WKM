import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const repasswordMatchPassord = (): ValidatorFn =>{
  // repasswordMatchPassord (): ValidatorFn{

  return (form: AbstractControl ): ValidationErrors | null  => {

    /* Check if the room name already exists */
    var passValue: string = form.get('password')?.value;
    var rePassValue: string = form.get('rePassword')?.value;
    // use data param
    if (passValue !== rePassValue) {
      return { misMatch: true };
    }
    return null;
  }
};
