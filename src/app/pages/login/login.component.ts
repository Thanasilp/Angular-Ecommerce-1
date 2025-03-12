import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login = {
    email: 'test2@test.com',
    password: 'Test@1234',
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  onLogin() {
    const { email, password } = this.login;

    this.authService.loginUser(email, password).subscribe({
      next: () => {
        this.toastr.success('Success', 'Login Successful');
        setTimeout(() => {
          // this.router.navigate(['home']);
          window.location.href = 'home';
        }, 1000);
      },
      error: () => {
        this.toastr.error('Error', 'Invalid credentials');
      },
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
