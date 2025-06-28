import { Component,  OnInit } from "@angular/core"
import {  FormBuilder, FormGroup, Validators } from "@angular/forms"
import  { ActivatedRoute, Router } from "@angular/router"
import { financeLegalSchema,  FinanceLegalFormData } from "./finance-legal-schema"
import { ownershipDetailsSchema } from "./ownership-details-schema"
import { apiLinks } from "src/app/core/apiLink"
import { MessageService } from "primeng/api"
import { CommonService } from "src/app/services/common.service"

@Component({
  selector: "app-finance-legal",
  templateUrl: "./finance-legal.component.html",
  styleUrls: ["./finance-legal.component.scss"],
})
export class FinanceLegalComponent implements OnInit {
  formSchema: FinanceLegalFormData = financeLegalSchema
  ownershipSchema = ownershipDetailsSchema
  financeLegalForm: FormGroup
  ownershipForm: FormGroup
  propertyId: string | null = null
  draftId: string | null = null
  isEditing = false
  editingOwnership = false
  selectedFile: File | null = null
  propertyAddress = "sakjdkasjhd Old Pallavaram, Chennai, Tamil Nadu, India, Pincode - 500010"

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private commonService: CommonService
  ) {
    this.financeLegalForm = this.fb.group({
      ownershipDetails: this.fb.group({
        ownershipType: [this.formSchema.ownershipDetails.ownershipType],
        ownershipDocument: [this.formSchema.ownershipDetails.ownershipDocument],
        documentUploaded: [this.formSchema.ownershipDetails.documentUploaded],
      }),
      bankDetails: this.fb.group({
        accountNumber: ["", [Validators.required]],
        reEnterAccountNumber: ["", [Validators.required]],
        ifscCode: ["", [Validators.required]],
        bankName: ["", [Validators.required]],
      }),
      taxDetails: this.fb.group({
        hasGSTIN: [false],
        gstin: [""],
        pan: [""],
        hasTAN: [false],
        tan: [""],
      }),
      consent: [false, Validators.requiredTrue],
    })

    this.ownershipForm = this.fb.group({
      ownershipType: ["My Own property", Validators.required],
      documentUploaded: [false],
    })
  }

  ngOnInit(): void {
    // Get route parameters
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params["id"] || null
      this.draftId = params["draft_id"] || null
      this.isEditing = params["edit"] === "true"
    })

    // Update GSTIN and TAN validators based on toggle state
    this.financeLegalForm.get("taxDetails.hasGSTIN")?.valueChanges.subscribe((hasGSTIN) => {
      const gstinControl = this.financeLegalForm.get("taxDetails.gstin")
      const panControl = this.financeLegalForm.get("taxDetails.pan")

      if (hasGSTIN) {
        gstinControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
        ])
        panControl?.setValidators([Validators.required])
      } else {
        gstinControl?.clearValidators()
        panControl?.clearValidators()
      }

      gstinControl?.updateValueAndValidity()
      panControl?.updateValueAndValidity()
    })

    this.financeLegalForm.get("taxDetails.hasTAN")?.valueChanges.subscribe((hasTAN) => {
      const tanControl = this.financeLegalForm.get("taxDetails.tan")

      if (hasTAN) {
        tanControl?.setValidators([Validators.required, Validators.pattern(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/)])
      } else {
        tanControl?.clearValidators()
      }

      tanControl?.updateValueAndValidity()
    })
  }

  validateAccountNumbers(): boolean {
    const accountNumber = this.financeLegalForm.get("bankDetails.accountNumber")?.value
    const reEnterAccountNumber = this.financeLegalForm.get("bankDetails.reEnterAccountNumber")?.value

    return accountNumber === reEnterAccountNumber
  }

  onSubmit(): void {
    console.log("this.financeLegalForm", this.financeLegalForm.value);
    console.log("this.financeLegalForm.valid", this.financeLegalForm.valid);

    if (this.financeLegalForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.financeLegalForm.controls).forEach((key) => {
        const control = this.financeLegalForm.get(key)
        control?.markAsTouched()

        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach((nestedKey) => {
            control.get(nestedKey)?.markAsTouched()
          })
        }
      })
      return
    }


    if (!this.validateAccountNumbers()) {
      // Handle account number mismatch
      this.financeLegalForm.get("bankDetails.reEnterAccountNumber")?.setErrors({ mismatch: true })
      return
    }

    // Save form data
    const formData = this.financeLegalForm.value
    console.log("Finance & Legal form submitted:", formData)

    this.commonService.postCommonHttpClient(apiLinks.properties.saveBasicInfo, this.financeLegalForm.value).subscribe((res: any) => {
      console.log("result", res);
      this.messageService.add({
        severity: "success",
        summary: "Baic Info Saved",
        detail: "Your basic info has been saved",
        life: 3000,
      });
      // Navigate back to dashboard
      this.router.navigate([`/dashboard`])
    })

    // Navigate to next step or save and exit
  }

  navigateNext(): void {
    // Determine next step based on your flow
    const nextStep = "/onboarding/review" // Assuming review is the next step

    // Add query parameters if they exist
    const queryParams: any = {}

    if (this.propertyId) {
      queryParams.id = this.propertyId
    } else if (this.draftId) {
      queryParams.draft_id = this.draftId
      queryParams.isNewFlow = true
    }

    this.router.navigate([nextStep], { queryParams })
  }

  navigateBack(): void {
    // Determine previous step based on your flow
    const prevStep = "/onboarding/policies" // Assuming policies is the previous step

    // Add query parameters if they exist
    const queryParams: any = {}

    if (this.propertyId) {
      queryParams.id = this.propertyId
    } else if (this.draftId) {
      queryParams.draft_id = this.draftId
      queryParams.isNewFlow = true
    }

    this.router.navigate([prevStep], { queryParams })
  }

  toggleEditOwnership(): void {
    this.editingOwnership = !this.editingOwnership

    if (this.editingOwnership) {
      // Set initial values when opening the edit form
      this.ownershipForm.patchValue({
        ownershipType: this.formSchema.ownershipDetails.ownershipType,
        documentUploaded: this.formSchema.ownershipDetails.documentUploaded === "Yes",
      })
    }
  }

  saveOwnershipDetails(): void {
    if (this.ownershipForm.invalid) {
      this.ownershipForm.markAllAsTouched()
      return
    }

    // Update the main form with the new ownership details
    const ownershipType = this.ownershipForm.get("ownershipType")?.value
    const documentUploaded = this.ownershipForm.get("documentUploaded")?.value ? "Yes" : "No"

    this.financeLegalForm.get("ownershipDetails")?.patchValue({
      ownershipType: ownershipType,
      documentUploaded: documentUploaded,
    })

    // Update the displayed values
    this.formSchema.ownershipDetails.ownershipType = ownershipType
    this.formSchema.ownershipDetails.documentUploaded = documentUploaded

    // Close the edit form
    this.editingOwnership = false

    console.log("Ownership details updated:", {
      ownershipType,
      documentUploaded,
      selectedFile: this.selectedFile ? this.selectedFile.name : "No file selected",
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]
      this.ownershipForm.patchValue({
        documentUploaded: true,
      })
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
    const dropZone = document.querySelector(".drop-zone")
    dropZone?.classList.add("active")
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
    const dropZone = document.querySelector(".drop-zone")
    dropZone?.classList.remove("active")
  }

  onDrop(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const dropZone = document.querySelector(".drop-zone")
    dropZone?.classList.remove("active")

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0]
      this.ownershipForm.patchValue({
        documentUploaded: true,
      })
    }
  }
}
