import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMismatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  console.log('Validator called:', password?.value, confirmPassword?.value);

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};
