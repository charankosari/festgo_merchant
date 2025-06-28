import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';
import { apiLinks } from '../core/apiLink';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { CommonService } from './common.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private token: string = 'c3VqaXRoOTUzMUBnbWFpbC5jb206U3VqaXRoQDEyMzQ=';
  public returnUrl: string = '/dashboard';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.returnUrl =
    this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): any {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // In a real app, you might decode the JWT token here
      return { token };
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  loginViaOTP(request: any){
    this.httpClient.post(apiLinks.users.otpLogin, {"number": request.number, "otp": request.otp}).subscribe(
      (data: any) => {
        console.log('User logged in successfully', data);
        const mockToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        localStorage.setItem('accessToken', mockToken);
        const user = { token: mockToken };
        this.currentUserSubject.next(user);
        return true;
      },
      (error) => {
        console.error('Login failed', error);
        return false;
      }
    );
  }

  requestLoginOTP(number: any){
    this.httpClient.post(apiLinks.users.requestLoginOtp, {number}).subscribe(
      (data: any) => {
        const mockToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        localStorage.setItem('accessToken', mockToken);
        const user = { number, token: mockToken };
        this.currentUserSubject.next(user);
        if (data) {
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
            detail: data.message || 'Failed to send OTP. Please try again later.',
            life: 5000,
          });
        }
        return true;
      },
      (error) => {
        console.error('Login failed', error);
        return false;
      }
    );
  }

  login(email: string, password: string) {
    this.httpClient.post(apiLinks.users.login, { email, password }).subscribe(
      (data: any) => {
        console.log('User logged in successfully', data);
        localStorage.setItem('accessToken', data.jwtToken);
        localStorage.setItem('userData', JSON.stringify(data.user));
        const user = {token: JSON.stringify(data) };
        this.currentUserSubject.next(user);
        this.router.navigateByUrl(this.returnUrl);
        return data;
      },
      (error) => {
        console.error('Login failed', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error?.error?.message || 'Invalid email or password.',
          life: 5000,
        });
        throw error;
      }
    );
  }

  register(userData: any) {
    let userInfo = {
      userName: userData?.fullName,
      email: userData?.email,
      password: userData?.password,
      number: userData?.phone,
    };
    this.httpClient.post(apiLinks.users.signUp, userInfo).subscribe(
      (data: any) => {
        console.log('User registered successfully', data);
        // const mockToken =
        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        localStorage.setItem('accessToken', data.jwtToken);
        localStorage.setItem('userData', JSON.stringify(data.user));
        const user = { ...userData, token: JSON.stringify(data) };
        this.currentUserSubject.next(user);
        this.router.navigateByUrl(this.returnUrl);
        return data;
      },
      (error) => {
        console.error('Login failed', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error?.error?.message || 'An error occurred during registration.',
          life: 5000,
        });
        throw error;
      }
    );
    // const mockToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    // localStorage.setItem('accessToken', mockToken);
    // const user = { ...userData, token: mockToken };
    // this.currentUserSubject.next(user);
  }

  verifyOtpLogin(formData: any): any {
    this.httpClient.post(apiLinks.users.otpLogin, { number: formData.phone, otp: formData.otp }).subscribe(
      (data: any) => {
        console.log('OTP verified successfully', data);
        const mockToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9l  IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        localStorage.setItem('accessToken', mockToken);
        const user = { number: formData.phone, token: mockToken };
        this.currentUserSubject.next(user);
        return true;
      },
      (error) => {
        console.error('Error while verifying OTP', error);
        return false;
      }
    );
  }

  getMobileOtp(number: any): any {
    this.httpClient.post(apiLinks.users.getMobileOtp, { number: number }).subscribe(
      (data: any) => {
        console.log('Mobile otp sent successfully', data);
        return true;
      },
      (error) => {
        console.error('Error while sending otp', error);
        return false;
      }
    );
  }

  forgotPassword(email: string): any {
    this.httpClient.post(apiLinks.users.forgotPassword, { email }).subscribe(
      (data: any) => {
        console.log('Password reset link sent to email', data);
        return true;
      },
      (error) => {
        console.error('Error sending password reset link', error);
        return false;
      }
    );
  }

  changePassword(data: any): void {
    let info = {
      userRegisterNo: '387f7099-f950-44f8-a1e5-3607be4b1e3b',
      password: this.commonService.encodeBase64(data.password),
      confirmPassword: this.commonService.encodeBase64(data.confirmPassword),
    };
    this.httpClient.post(apiLinks.users.changePassword, info).subscribe(
      (data: any) => {
        console.log('Password changed successfully', data);
        return true;
      },
      (error) => {
        console.error('Error changing password', error);
        return false
      }
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
