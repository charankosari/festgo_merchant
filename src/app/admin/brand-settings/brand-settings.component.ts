import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { MessageService } from "primeng/api"
import { BrandingService } from "src/app/services/branding.service"

@Component({
  selector: "app-branding-settings",
  templateUrl: "./brand-settings.component.html",
  styleUrls: ["./brand-settings.component.scss"],
})
export class BrandingSettingsComponent implements OnInit {
  brandingForm: FormGroup
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    public brandingService: BrandingService,
    private messageService: MessageService,
  ) {
    this.brandingForm = this.fb.group({
      // Company/Product Information
      companyName: ["", Validators.required],
      productName: ["", Validators.required],

      // Logo Configuration
      logoType: ["both", Validators.required],
      logoText: [""],
      logoImageUrl: [""],
      logoImageAlt: [""],
      favicon: [""],

      // Color Scheme
      primaryColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      secondaryColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      accentColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],

      // Login/Auth Screen
      loginBackgroundColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      loginWelcomeText: ["", Validators.required],
      loginSubText: ["", Validators.required],

      // Additional Branding
      footerText: [""],
      copyrightText: [""],
      supportEmail: ["", Validators.email],
      supportPhone: [""],
    })
  }

  ngOnInit(): void {
    // Load current branding config
    this.loadBrandingConfig()
  }

  loadBrandingConfig(): void {
    const config = this.brandingService.config
    this.brandingForm.patchValue(config)
  }

  onSubmit(): void {
    if (this.brandingForm.valid) {
      this.isSubmitting = true

      // Update branding config
      const formValues = this.brandingForm.value
      this.brandingService.updateBrandingConfig(formValues)

      // Simulate API call delay
      setTimeout(() => {
        this.isSubmitting = false

        // Show success message
        this.messageService.add({
          severity: "success",
          summary: "Branding Updated",
          detail: "Your branding settings have been updated successfully.",
          life: 3000,
        })
      }, 1000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.brandingForm.controls).forEach((key) => {
        this.brandingForm.get(key)?.markAsTouched()
      })

      // Show error message
      this.messageService.add({
        severity: "error",
        summary: "Form Error",
        detail: "Please correct the errors in the form before submitting.",
        life: 3000,
      })
    }
  }

  resetToDefaults(): void {
    // Reset to default branding
    this.brandingService.updateBrandingConfig(this.brandingService.defaultConfig)
    this.loadBrandingConfig()

    // Show success message
    this.messageService.add({
      severity: "info",
      summary: "Defaults Restored",
      detail: "Branding settings have been reset to default values.",
      life: 3000,
    })
  }
}
