import { CommonService } from './../../../services/common.service';
import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators, FormControl } from "@angular/forms"
import  { ActivatedRoute, Router } from "@angular/router"
import  { ThemeService } from "../../../services/theme.service"
import  { MessageService } from "primeng/api"
import { FormService } from "src/app/services/form.service"
import { apiLinks } from 'src/app/core/apiLink';

interface FormField {
  key: string
  label: string
  subLabel?: string
  type: string
  placeholder?: string
  required?: boolean
  value?: any
  options?: string[]
  prefix?: string
  condition?: { key: string; value: any }
  action?: { label: string; type: string }
}

interface FormConfig {
  sectionTitle: string
  sectionSubtitle: string
  fields: FormField[]
}

@Component({
  selector: "app-basic-info",
  templateUrl: "./basic-info.component.html",
  styleUrls: ["./basic-info.component.scss"],
})
export class BasicInfoComponent implements OnInit {
  propertyForm: FormGroup
  formConfig: FormConfig
  propertyId: string | null = null
  draftId: string | null = null
  isNewFlow = false
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService,
    private messageService: MessageService,
    public formService: FormService,
    public commonService: CommonService
  ) {
    this.propertyForm = this.fb.group({})
    this.formConfig = {
      sectionTitle: "Property Details",
      sectionSubtitle: "Update your property details here",
      fields: [],
    }
  }

  ngOnInit(): void {
    // Get route parameters
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params["id"] || null
      this.draftId = params["draft_id"] || null
      this.isNewFlow = params["isNewFlow"] === "true"

      // Load form configuration
      this.loadFormConfig()
    })
  }

  loadFormConfig(): void {
    // In a real app, you might fetch this from an API
    this.formConfig = {
      sectionTitle: "Property Details",
      sectionSubtitle: "Update your property details here",
      fields: [
        {
          key: "propertyName",
          label: "Name of the Property",
          subLabel: "Enter the name as on the property documents",
          type: "text",
          placeholder: "Enter the full name",
          required: true,
          value: "Dream Land",
        },
        {
          key: "hotelStarRating",
          label: "Hotel Star Rating",
          type: "dropdown",
          placeholder: "Select rating",
          options: ["1", "2", "3", "4", "5"],
          required: true,
          value: "5",
        },
        {
          key: "builtYear",
          label: "When was the property built?",
          type: "dropdown",
          placeholder: "Select a year",
          options: Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`),
          required: true,
          value: "2021",
        },
        {
          key: "acceptingBookingSince",
          label: "Accepting booking since?",
          subLabel: "Since when is this property available for guests to book",
          type: "dropdown",
          placeholder: "Select a year",
          options: Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`),
          required: true,
          value: "2023",
        },
        {
          key: "channelManager",
          label: "Do you work with channel manager?",
          subLabel: "This allows to update inventory across different travel platforms",
          type: "radio",
          options: ["Yes", "No"],
          required: true,
          value: "No",
        },
        {
          key: "channelManagerName",
          label: "Channel Manager Name",
          type: "text",
          placeholder: "Enter channel manager name",
          condition: { key: "channelManager", value: "Yes" },
          value: "",
        },
        {
          key: "email",
          label: "Email ID",
          subLabel: "These contact details will be shared with the guests when they make a booking",
          type: "email",
          placeholder: "Enter email ID",
          action: { label: "Verify", type: "button" },
          required: true,
          value: "564t8wc2u9@jkotypc.com",
        },
        {
          key: "mobileNumber",
          label: "Mobile number",
          type: "tel",
          prefix: "+91",
          placeholder: "Enter number",
          action: { label: "Verify", type: "button" },
          required: true,
          value: "9030427945",
        },
        {
          key: "sameAsWhatsapp",
          label: "Use the same mobile number for WhatsApp.",
          type: "checkbox",
          value: true,
        },
        {
          key: "landline",
          label: "Landline number (Optional)",
          type: "text",
          placeholder: "Eg: 0124 46373533",
          value: "",
        },
      ],
    }

    // Initialize form controls
    this.initializeForm()
  }

  initializeForm(): void {
    // Create form controls based on the configuration
    const formGroup: any = {}

    this.formConfig.fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : []

      // Add email validator for email fields
      if (field.type === "email") {
        validators.push(Validators.email)
      }

      // Create form control with initial value
      formGroup[field.key] = new FormControl(field.value || "", validators)
    })

    this.propertyForm = this.fb.group(formGroup)

    // Set up conditional field visibility
    this.setupConditionalFields()
  }

  setupConditionalFields(): void {
    // Find fields with conditions
    const conditionalFields = this.formConfig.fields.filter((field) => field.condition)

    // For each conditional field, set up a listener on the condition field
    conditionalFields.forEach((field) => {
      if (field.condition) {
        const conditionKey = field.condition.key
        const conditionValue = field.condition.value

        // Listen for changes on the condition field
        this.propertyForm.get(conditionKey)?.valueChanges.subscribe((value) => {
          if (value === conditionValue) {
            // Show the field
            if (!this.propertyForm.contains(field.key)) {
              this.propertyForm.addControl(field.key, new FormControl(field.value || ""))
            }
          } else {
            // Hide the field
            if (this.propertyForm.contains(field.key)) {
              this.propertyForm.removeControl(field.key)
            }
          }
        })

        // Initial check
        if (this.propertyForm.get(conditionKey)?.value !== conditionValue) {
          this.propertyForm.removeControl(field.key)
        }
      }
    })
  }

  shouldShowField(field: FormField): boolean {
    if (!field.condition) return true

    const conditionField = this.propertyForm.get(field.condition.key)
    return conditionField?.value === field.condition.value
  }

  onActionClick(field: FormField): void {
    if (field.action?.type === "button") {
      if (field.action.label === "Verify") {
        // Simulate verification process
        this.messageService.add({
          severity: "info",
          summary: "Verification",
          detail: `Verification code sent to ${this.propertyForm.get(field.key)?.value}`,
          life: 3000,
        })
      }
    }
  }

  onsaveSubmit(): void {
    if (this.propertyForm.valid) {
      this.isSubmitting = true

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false

        // Show success message
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Property details saved successfully",
          life: 3000,
        })
        console.log("Form Data:", this.propertyForm.value)

        // Navigate to the next step
        // this.router.navigate(["/onboarding/location"])
      }, 1000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.propertyForm.controls).forEach((key) => {
        const control = this.propertyForm.get(key)
        control?.markAsTouched()
      })

      // Show error message
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please fill all required fields correctly",
        life: 3000,
      })
    }
  }

  onSubmit(): any {
    this.isSubmitting = true

    // Simulate API call
    try {

      this.commonService.postCommonHttpClient(apiLinks.properties.saveBasicInfo, this.propertyForm.value).subscribe((res: any) => {
        console.log("result", res);
        this.messageService.add({
          severity: "success",
          summary: "Baic Info Saved",
          detail: "Your basic info has been saved",
          life: 3000,
        });
        // Navigate back to dashboard
        // this.router.navigate([`/onboarding/location/${res?.property?.id}`]);
        this.router.navigate([`/onboarding/location`], {
          queryParams: {
            id: res?.property?.id,
            // draft_id: this.draftId,
          },
        })
      })

      // this.formService.saveBasicInfo(this.propertyForm.value);
      // this.isSubmitting = false;
      // this.messageService.add({
      //   severity: "success",
      //   summary: "Baic Info Saved",
      //   detail: "Your basic info has been saved",
      //   life: 3000,
      // });
      // // Navigate back to dashboard
      // this.router.navigate(["/onboarding/location"]);
    } catch (error) {
      this.isSubmitting = false;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to save. Please try again.",
        life: 3000,
      });
    }
  }

  cancel(): void {
    // Navigate back to dashboard
    this.router.navigate(["/dashboard"])
  }
}
