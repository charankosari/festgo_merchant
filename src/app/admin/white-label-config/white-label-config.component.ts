import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { WhiteLabelService, WhiteLabelConfig } from "../../services/white-label.service"
import  { MessageService } from "primeng/api"
import  { ThemeService } from "../../services/theme.service"

@Component({
  selector: "app-white-label-config",
  templateUrl: "./white-label-config.component.html",
  styleUrls: ["./white-label-config.component.scss"],
})
export class WhiteLabelConfigComponent implements OnInit {
  configForm: FormGroup
  currentConfig: WhiteLabelConfig
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private whiteLabelService: WhiteLabelService,
    private messageService: MessageService,
    public themeService: ThemeService,
  ) {
    this.configForm = this.fb.group({
      primaryColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      secondaryColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      accentColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      loginBackgroundColor: ["", [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
      logoType: ["default", Validators.required],
      logoUrl: [""],
      logoText: ["", Validators.required],
      companyName: ["", Validators.required],
    })

    this.currentConfig = {
      primaryColor: "#f05a29",
      secondaryColor: "#4a4a4a",
      accentColor: "#304c8e",
      loginBackgroundColor: "#0a2647",
      logoType: "default",
      logoText: "FestGo",
      companyName: "FestGo",
      logoUrl: "../../../../assets/small-logo.jpeg"
    }
  }

  ngOnInit(): void {
    this.whiteLabelService.config$.subscribe((config) => {
      this.currentConfig = config
      this.configForm.patchValue({
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
        accentColor: config.accentColor,
        loginBackgroundColor: config.loginBackgroundColor,
        logoType: config.logoType,
        logoUrl: config.logoUrl || "",
        logoText: config.logoText,
        companyName: config.companyName,
      })

      // Conditionally set validators based on logo type
      this.updateLogoValidators()
    })

    // Listen for logo type changes to update validators
    this.configForm.get("logoType")?.valueChanges.subscribe((value) => {
      this.updateLogoValidators()
    })
  }

  updateLogoValidators(): void {
    const logoType = this.configForm.get("logoType")?.value
    const logoUrlControl = this.configForm.get("logoUrl")
    const logoTextControl = this.configForm.get("logoText")

    if (logoType === "custom") {
      logoUrlControl?.setValidators([Validators.required])
      logoTextControl?.clearValidators()
    } else {
      logoUrlControl?.clearValidators()
      logoTextControl?.setValidators([Validators.required])
    }

    logoUrlControl?.updateValueAndValidity()
    logoTextControl?.updateValueAndValidity()
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      this.isSubmitting = true

      const formValue = this.configForm.value

      // Only include logoUrl if logoType is custom
      if (formValue.logoType !== "custom") {
        delete formValue.logoUrl
      }

      this.whiteLabelService.updateConfig(formValue)

      setTimeout(() => {
        this.isSubmitting = false
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "White label configuration updated successfully",
          life: 3000,
        })
      }, 1000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.configForm.controls).forEach((key) => {
        this.configForm.get(key)?.markAsTouched()
      })

      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please fix the errors in the form",
        life: 3000,
      })
    }
  }

  resetToDefault(): void {
    this.whiteLabelService.resetToDefault()

    this.messageService.add({
      severity: "info",
      summary: "Reset",
      detail: "White label configuration reset to default",
      life: 3000,
    })
  }

  previewLogo(): string {
    const logoType = this.configForm.get("logoType")?.value
    const logoUrl = this.configForm.get("logoUrl")?.value

    if (logoType === "custom" && logoUrl) {
      return logoUrl
    }

    return ""
  }
}
