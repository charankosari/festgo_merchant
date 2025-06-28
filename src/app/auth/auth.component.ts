import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { ThemeService } from "../services/theme.service"
import  { AuthService } from "../services/auth.service"
import  { Router, ActivatedRoute } from "@angular/router"
import  { MessageService } from "primeng/api"
import  { HttpClient } from "@angular/common/http"
import  { WhiteLabelService, WhiteLabelConfig } from "../services/white-label.service"
import { apiLinks } from "../core/apiLink"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignUp = false;
  signIn = true;
  returnUrl = '/dashboard';
  whiteLabelConfig: WhiteLabelConfig;
  showPhoneInput = false;

  // Forms
  signInForm: FormGroup;
  signUpForm: FormGroup;
  forgotPasswordForm: FormGroup;
  phoneSignInForm: FormGroup;

  // Forgot password dialog
  forgotPasswordVisible = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public themeService: ThemeService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private http: HttpClient,
    private whiteLabelService: WhiteLabelService,
    private httpClient: HttpClient
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.phoneSignInForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10)]],
      otp: ['', Validators.required],
    });

    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Initialize with default config
    this.whiteLabelConfig = this.whiteLabelService.getWhiteLabelConfig();
  }

  ngOnInit(): void {
    // Subscribe to white label config changes
    this.whiteLabelService.config$.subscribe((config) => {
      this.whiteLabelConfig = config;
      this.applyBranding();
    });
  }

  private applyBranding(): void {
    // Apply branding colors to login page
    const loginBg = document.querySelector('.branding-section') as HTMLElement;
    if (loginBg) {
      loginBg.style.backgroundColor =
        this.whiteLabelConfig.loginBackgroundColor;
    }
  }

  toggleForm(): void {
    this.signIn = true;
    this.isSignUp = false;
    this.showPhoneInput = false;
  }

  toggleSignUpForm(): void {
    this.signIn = false;
    this.isSignUp = true;
    this.showPhoneInput = false;
  }

  toggleFormPhone(): void {
    this.signIn = false;
    this.isSignUp = false;
    this.showPhoneInput = true;
  }

  toggleFormSignIn(): void {
    this.signIn = true;
    this.isSignUp = false;
    this.showPhoneInput = false;
  }

  onSignIn(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      // Call the auth service to login
      const success = this.authService.login(email, password);

      // if (success) {
      //   // Navigate to the return url
      //   this.router.navigateByUrl(this.returnUrl);
      // }
    }
  }

  async onSignUp() {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;

      // Call the auth service to register
      await this.authService.register(userData);
    }else {
      // Show validation errors
      Object.keys(this.signUpForm.controls).forEach((key) => {
        const control = this.signUpForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      this.messageService.add({
        severity: 'error',
        summary: 'Registration Failed',
        detail: 'Please fill in all required fields correctly.',
        life: 5000,
      });
    }
  }

  onPhoneSignIn(): void {
    if (this.phoneSignInForm.valid) {
      const formData = this.phoneSignInForm.value;
      this.httpClient.post(apiLinks.users.otpLogin, { number: formData.phone, otp: formData.otp }).subscribe(
            (data: any) => {
              console.log('OTP verified successfully', data);
              localStorage.setItem('accessToken', data.jwtToken);
              localStorage.setItem('userData', JSON.stringify(data.user));
              const user = { token: JSON.stringify(data) };
              this.authService.currentUserSubject.next(user);
              this.router.navigateByUrl(this.returnUrl);
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'An error occurred while verifying the OTP.',
                life: 5000,
              });
              console.error('Error verifying OTP:', error);
            }
          );
      // this.authService.verifyOtpLogin(phone).subscribe(
      //   (response: any) => {
      //     if (response) {
      //       // Navigate to the return url

      //       this.router.navigateByUrl(this.returnUrl);
      //     } else {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Login Failed',
      //         detail: response.message || 'Invalid OTP or phone number.',
      //         life: 5000,
      //       });
      //     }
      //   },
      //   (error: any) => {
      //     this.messageService.add({
      //       severity: 'error',
      //       summary: 'Login Failed',
      //       detail: 'An error occurred while verifying the OTP.',
      //       life: 5000,
      //     });
      //     console.error('Error verifying OTP:', error);
      //   }
      // );
      console.log(formData);
    }
  }

  showForgotPasswordDialog(event: Event): void {
    event.preventDefault();
    this.forgotPasswordVisible = true;

    // Reset the form
    this.forgotPasswordForm.reset();
  }

  requestLoginOtp() {
    const number = this.phoneSignInForm.get('phone')?.value;
    console.log(number);
    let data = this.authService.requestLoginOTP(number);
    console.log(data);
  }

  getMobileOtp(): void {
    const phone = this.phoneSignInForm.get('phone')?.value;
    this.authService.getMobileOtp(phone).subscribe(
      (response: any) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'OTP Sent',
            detail: 'An OTP has been sent to your mobile number.',
            life: 5000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to send OTP. Please try again later.',
            life: 5000,
          });
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send OTP. Please try again later.',
          life: 5000,
        });
        console.error('Error sending OTP:', error);
      }
    );
  }

  onForgotPasswordSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isSubmitting = true;
      const email = this.forgotPasswordForm.get('email')?.value;

      // Make API call to reset password
      // In a real application, replace this with your actual API endpoint
      this.http
        .post('https://api.example.com/reset-password', { email })
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            this.forgotPasswordVisible = false;

            // Show success message
            this.messageService.add({
              severity: 'success',
              summary: 'Password Reset Email Sent',
              detail: `We've sent a password reset link to ${email}. Please check your inbox.`,
              life: 5000,
            });
          },
          (error) => {
            this.isSubmitting = false;

            // Show error message
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Failed to send password reset email. Please try again later.',
              life: 5000,
            });

            console.error('Password reset error:', error);
          }
        );
    }
  }
}
