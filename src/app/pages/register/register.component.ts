import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterData } from '../../interfaces/register-data';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { PasswordValidator } from '../../validators/password-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterLink,
    PasswordModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private registerService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
      ]),
      password: new FormControl('', [Validators.required, PasswordValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMismatchValidator }
  );

  onRegister() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.registerService.registerUser(postData as RegisterData).subscribe({
      next: (response) => {
        this.toastr.success('Registered Successfully', 'Success');
        this.router.navigate(['login']);
        console.log(response);
      },
      error: (err) => {
        if (err.status === 409) {
          // Email ถูกใช้ไปแล้ว
          this.toastr.error(
            'This email is already in use.',
            'Registration Failed'
          );
        } else if (err.status === 400) {
          this.toastr.error('Invalid Input', 'Please check your input data.');
        } else {
          this.toastr.error('Something went wrong. Please try again.', 'Error');
        }
        console.log(err);
      },
    });
  }

  get username() {
    return this.registerForm.controls['username'] as FormControl;
  }

  get email() {
    return this.registerForm.controls['email'] as FormControl;
  }

  get password() {
    return this.registerForm.controls['password'] as FormControl;
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'] as FormControl;
  }
}
