import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const PasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) return { required: true };
  const password = control.value as string;
  const errors: ValidationErrors = {};

  if (password.length < 8) {
    errors['minLength'] = 'Your password requires at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    errors['uppercase'] =
      'Your password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    errors['lowercase'] =
      'Your password must contain at least one lowercase letter';
  }
  if (!/\d/.test(password)) {
    errors['number'] = 'Your password must contain at least one number';
  }
  if (!/[\W_]/.test(password)) {
    errors['specialChar'] =
      'Your password must contain at least one special character';
  }

  return Object.keys(errors).length ? errors : null;
};
