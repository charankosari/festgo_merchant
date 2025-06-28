import { Component, HostListener, Input } from "@angular/core"
import  { Router } from "@angular/router"
import  { ThemeService } from "../../../services/theme.service"
import  { AuthService } from "../../../services/auth.service"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { MessageService } from "primeng/api"

@Component({
  selector: "app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.scss"],
})
export class AppLayoutComponent {
  @Input() pageTitle = ""
  @Input() pageStatus = ""
  @Input() activeMenuItem = "properties"

  userName = "Cijrr";
  role= "vendor"
  showProfileMenu = false
  showChangePasswordDialog = false
  isSubmitting = false
  changePasswordForm: FormGroup
  userData: any;

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    let data: any = localStorage.getItem("userData");
    this.userData = JSON.parse(data);
    this.userName = this.userData?.username;
    this.role = this.userData?.role;
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    )
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get("newPassword")?.value
    const confirmPassword = form.get("confirmPassword")?.value

    if (newPassword !== confirmPassword) {
      form.get("confirmPassword")?.setErrors({ passwordMismatch: true })
      return { passwordMismatch: true }
    }

    return null
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation()
    this.showProfileMenu = !this.showProfileMenu
  }

  navigateToProfile(): void {
    this.showProfileMenu = false
    this.router.navigate(["/profile"])
  }

  changePassword(): void {
    this.showProfileMenu = false
    this.showChangePasswordDialog = true
    this.changePasswordForm.reset()
  }

  onChangePasswordSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.isSubmitting = true

      // In a real app, you would call a service to change the password
      setTimeout(() => {
        this.isSubmitting = false
        this.showChangePasswordDialog = false

        // Show success message
        this.messageService.add({
          severity: "success",
          summary: "Password Changed",
          detail: "Your password has been successfully updated.",
          life: 3000,
        })
      }, 1500)
    }
  }

  logout(): void {
    this.showProfileMenu = false
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  // Close profile menu when clicking outside
  @HostListener("document:click")
  onDocumentClick(): void {
    if (this.showProfileMenu) {
      this.showProfileMenu = false
    }
  }
}
