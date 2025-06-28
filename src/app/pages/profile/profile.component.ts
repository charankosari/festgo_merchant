import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from "@angular/core"
import  { Location } from "@angular/common"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { ThemeService } from "src/app/services/theme.service"
import { AuthService } from "src/app/services/auth.service"
import { apiLinks } from 'src/app/core/apiLink';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'primeng/api';


interface UserProfile {
  firstName: string
  lastName: string
  mobileNumber: string
  whatsappNumber: string
  emailId: string
  userType: string
  designation: string
  role: string
  isEmailVerified: boolean
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  activeTab = "profile"
  isEditMode = false
  isLoading = false
  isSaving = false
  profileForm: FormGroup

  userProfile: UserProfile = {
    firstName: "Cijrr",
    lastName: "",
    mobileNumber: "",
    whatsappNumber: "",
    emailId: "cijrr55549@deusa7.com",
    userType: "User",
    designation: "Central Reservation Manager",
    role: "Admin",
    isEmailVerified: true,
  }

  originalProfile: UserProfile = { ...this.userProfile }
  userData: any;

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private commonService: CommonService,
    private messageService: MessageService
  ) {
    this.profileForm = this.createProfileForm()
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private createProfileForm(): FormGroup {
    return this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(2)]],
      number: ["", [Validators.pattern(/^[0-9]{10}$/)]],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required]
    })
  }

  private loadUserProfile(): void {
    this.isLoading = true;
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` }
    this.httpClient.get(apiLinks.users.getUserDetails, {headers}).subscribe((data: any) => {
      console.log(data);
      this.userData = data?.user;
      this.isLoading = false;
      this.profileForm.patchValue({
        username: this.userData?.username,
        email: this.userData?.email,
        number: this.userData?.number,
        role: this.userData?.role
      });
    });
    // Simulate API call - replace with actual service call
    setTimeout(() => {
      this.originalProfile = { ...this.userProfile }
      this.isLoading = false
    }, 500)
  }

  get isFormValid(): boolean {
    return this.profileForm.valid
  }

  get hasUnsavedChanges(): boolean {
    if (!this.isEditMode) return false

    const formValue = this.profileForm.value
    return (
      formValue.firstName !== this.originalProfile.firstName ||
      formValue.lastName !== this.originalProfile.lastName ||
      formValue.mobileNumber !== this.originalProfile.mobileNumber ||
      formValue.whatsappNumber !== this.originalProfile.whatsappNumber ||
      formValue.designation !== this.originalProfile.designation
    )
  }

  get displayInitials(): string {
    const first = this.userProfile.firstName?.charAt(0) || ""
    const last = this.userProfile.lastName?.charAt(0) || "i"
    return first + last
  }

  setActiveTab(tab: string): void {
    if (this.isEditMode && this.hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        this.cancelEdit()
        this.activeTab = tab
      }
    } else {
      this.activeTab = tab
    }
  }

  goBack(): void {
    if (this.isEditMode && this.hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        this.location.back()
      }
    } else {
      this.location.back()
    }
  }

  editProfile(): void {
    this.isEditMode = true
    this.profileForm.patchValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      mobileNumber: this.userProfile.mobileNumber,
      whatsappNumber: this.userProfile.whatsappNumber,
      designation: this.userProfile.designation,
    })
  }

  cancelEdit(): void {
    this.isEditMode = false
    this.profileForm.reset()
    // Reset to original values
    this.userProfile = { ...this.originalProfile }
  }

  async saveProfile(): Promise<void> {
    if (!this.profileForm.valid) {
      this.markFormGroupTouched()
      return
    }

    this.isSaving = true

    try {
      const formValue = this.profileForm.value
      const updatedProfile = {
        username: formValue.username,
        number: formValue.number
      }
      const token = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${token}` }
      // Simulate API call - replace with actual service call
      this.httpClient.put(apiLinks.users.updateProfile, updatedProfile, {headers}).subscribe((data: any)=>{
        console.log(data, "data from user updated");
        this.profileForm.patchValue({
          username: data.username,
          number: data.number,
        });
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Profile updated successfully!",
          life: 3000,
        });
      });

      // Update local data
      // this.userProfile = { ...updatedProfile }
      // this.originalProfile = { ...updatedProfile }

      // Exit edit mode
      this.isEditMode = false

      // Show success message (you can replace with toast notification)
    } catch (error) {
      console.error("Error updating profile:", error)
      this.messageService.add({
        severity: 'error',
        summary: 'Error updating profile:',
        detail: 'Failed to update profile. Please try again.',
        life: 3000,
      });
    } finally {
      this.isSaving = false
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key)
      if (control) {
        control.markAsTouched()
      }
    })
  }

  getFieldError(fieldName: string): string {
    const control = this.profileForm.get(fieldName)
    if (control && control.errors && control.touched) {
      if (control.errors["required"]) {
        return `${this.getFieldLabel(fieldName)} is required`
      }
      if (control.errors["minlength"]) {
        return `${this.getFieldLabel(fieldName)} must be at least ${control.errors["minlength"].requiredLength} characters`
      }
      if (control.errors["pattern"]) {
        return `Please enter a valid ${this.getFieldLabel(fieldName).toLowerCase()}`
      }
    }
    return ""
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: "First Name",
      lastName: "Last Name",
      mobileNumber: "Mobile Number",
      whatsappNumber: "WhatsApp Number",
      designation: "Designation",
    }
    return labels[fieldName] || fieldName
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.profileForm.get(fieldName)
    return !!(control && control.errors && control.touched)
  }
}
