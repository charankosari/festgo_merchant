// // import { Component,  OnInit } from "@angular/core"
// // import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
// // import  { Router, ActivatedRoute } from "@angular/router"
// // import  { ThemeService } from "../../../services/theme.service"
// // import  { MessageService } from "primeng/api"
// // import { policiesSchema,  PolicySection } from "./policies.shema"

// // @Component({
// //   selector: "app-policies",
// //   templateUrl: "./policies.component.html",
// //   styleUrls: ["./policies.component.scss"],
// // })
// // export class PoliciesComponent implements OnInit {
// //   policiesForm: FormGroup
// //   propertyId: string | null = null
// //   draftId: string | null = null
// //   isSubmitting = false
// //   formSchema = policiesSchema

// //   constructor(
// //     private fb: FormBuilder,
// //     private router: Router,
// //     private route: ActivatedRoute,
// //     public themeService: ThemeService,
// //     private messageService: MessageService,
// //   ) {
// //     // Initialize the form with a simple structure first
// //     this.policiesForm = this.fb.group({
// //       allowUnmarried: ["Yes", Validators.required],
// //       showCoupleFriendly: ["Yes", Validators.required],
// //       allowBelow18: ["No", Validators.required],
// //       allowMaleGroups: ["Yes", Validators.required],
// //       checkInTime: ["12:00 pm (noon)", Validators.required],
// //       checkOutTime: ["11:00 am", Validators.required],
// //     })
// //   }

// //   ngOnInit(): void {
// //     // Get route parameters
// //     this.route.queryParams.subscribe((params) => {
// //       this.propertyId = params["id"] || null
// //       this.draftId = params["draft_id"] || null
// //     })
// //   }

// //   toggleSection(section: PolicySection): void {
// //     section.expanded = !section.expanded
// //   }

// //   // Add this method to handle dropdown options
// //   getDropdownOptions(options: string[] | undefined): any[] {
// //     if (!options) return []
// //     return options.map((option) => ({ label: option, value: option }))
// //   }

// //   onBack(): void {
// //     // Navigate to previous step
// //     this.router.navigate(["/onboarding/amenities"], {
// //       queryParams: {
// //         id: this.propertyId,
// //         draft_id: this.draftId,
// //       },
// //     })
// //   }

// //   onSubmit(): void {
// //     if (this.policiesForm.invalid) {
// //       this.messageService.add({
// //         severity: "error",
// //         summary: "Error",
// //         detail: "Please fill in all required fields",
// //         life: 3000,
// //       })
// //       return
// //     }

// //     console.log("Form values:", this.policiesForm.value)

// //     this.isSubmitting = true

// //     // Simulate API call
// //     setTimeout(() => {
// //       this.isSubmitting = false

// //       // Navigate to next step
// //       this.router.navigate(["/onboarding/finance-legal"], {
// //         queryParams: {
// //           id: this.propertyId,
// //           draft_id: this.draftId,
// //         },
// //       })

// //       // Show success message
// //       this.messageService.add({
// //         severity: "success",
// //         summary: "Success",
// //         detail: "Policies saved successfully!",
// //         life: 3000,
// //       })
// //     }, 1000)
// //   }
// // }


// import { Component, OnInit } from "@angular/core"
// import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms"
// import { Router, ActivatedRoute } from "@angular/router"
// import { HttpClient } from "@angular/common/http"

// interface PolicyFormData {
//   checkInTime: string
//   checkOutTime: string
//   minimumStay: number
//   maximumStay: number
//   advanceBooking: number
//   instantBooking: boolean
//   smokingAllowed: boolean
//   petsAllowed: boolean
//   partiesAllowed: boolean
//   childrenAllowed: boolean
//   additionalGuestFee: number
//   securityDeposit: number
//   cleaningFee: number
//   cancellationPolicy: string
//   houseRules: string[]
//   customRules: string[]
//   quietHours: {
//     enabled: boolean
//     startTime: string
//     endTime: string
//   }
//   ageRestriction: {
//     enabled: boolean
//     minimumAge: number
//   }
//   guestVerification: {
//     idRequired: boolean
//     phoneRequired: boolean
//     emailRequired: boolean
//   }
// }

// @Component({
//   selector: "app-policies",
//   templateUrl: "./policies.component.html",
//   styleUrls: ["./policies.component.scss"],
// })
// export class PoliciesComponent implements OnInit {
//   policiesForm!: FormGroup
//   isLoading = false
//   isSubmitting = false
//   propertyId: string | null = null
//   draftId: string | null = null

//   // Dropdown options
//   cancellationPolicyOptions = [
//     { label: "Flexible - Full refund 1 day prior to arrival", value: "flexible" },
//     { label: "Moderate - Full refund 5 days prior to arrival", value: "moderate" },
//     { label: "Strict - 50% refund up until 1 week prior to arrival", value: "strict" },
//     { label: "Super Strict - No refund", value: "super_strict" },
//   ]

//   predefinedHouseRules = [
//     { label: "No smoking inside the property", value: "no_smoking_inside" },
//     { label: "No loud music after 10 PM", value: "no_loud_music" },
//     { label: "No shoes inside the house", value: "no_shoes_inside" },
//     { label: "Keep the property clean and tidy", value: "keep_clean" },
//     { label: "No unauthorized guests", value: "no_unauthorized_guests" },
//     { label: "Respect neighbors and community", value: "respect_neighbors" },
//     { label: "No illegal activities", value: "no_illegal_activities" },
//     { label: "Check out on time", value: "checkout_on_time" },
//   ]

//   timeOptions = [
//     { label: "12:00 AM", value: "00:00" },
//     { label: "1:00 AM", value: "01:00" },
//     { label: "2:00 AM", value: "02:00" },
//     { label: "3:00 AM", value: "03:00" },
//     { label: "4:00 AM", value: "04:00" },
//     { label: "5:00 AM", value: "05:00" },
//     { label: "6:00 AM", value: "06:00" },
//     { label: "7:00 AM", value: "07:00" },
//     { label: "8:00 AM", value: "08:00" },
//     { label: "9:00 AM", value: "09:00" },
//     { label: "10:00 AM", value: "10:00" },
//     { label: "11:00 AM", value: "11:00" },
//     { label: "12:00 PM", value: "12:00" },
//     { label: "1:00 PM", value: "13:00" },
//     { label: "2:00 PM", value: "14:00" },
//     { label: "3:00 PM", value: "15:00" },
//     { label: "4:00 PM", value: "16:00" },
//     { label: "5:00 PM", value: "17:00" },
//     { label: "6:00 PM", value: "18:00" },
//     { label: "7:00 PM", value: "19:00" },
//     { label: "8:00 PM", value: "20:00" },
//     { label: "9:00 PM", value: "21:00" },
//     { label: "10:00 PM", value: "22:00" },
//     { label: "11:00 PM", value: "23:00" },
//   ]

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute,
//     private http: HttpClient,
//   ) {
//     this.initializeForm()
//   }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.propertyId = params["id"] || null
//       this.draftId = params["draft_id"] || null
//       this.loadExistingPolicies()
//     })
//   }

//   private initializeForm(): void {
//     this.policiesForm = this.fb.group({
//       checkInTime: ["15:00", Validators.required],
//       checkOutTime: ["11:00", Validators.required],
//       minimumStay: [1, [Validators.required, Validators.min(1)]],
//       maximumStay: [30, [Validators.required, Validators.min(1)]],
//       advanceBooking: [365, [Validators.required, Validators.min(1)]],
//       instantBooking: [false],
//       smokingAllowed: [false],
//       petsAllowed: [false],
//       partiesAllowed: [false],
//       childrenAllowed: [true],
//       additionalGuestFee: [0, [Validators.min(0)]],
//       securityDeposit: [0, [Validators.min(0)]],
//       cleaningFee: [0, [Validators.min(0)]],
//       cancellationPolicy: ["flexible", Validators.required],
//       houseRules: [[]],
//       customRules: this.fb.array([]),
//       quietHours: this.fb.group({
//         enabled: [false],
//         startTime: ["22:00"],
//         endTime: ["08:00"],
//       }),
//       ageRestriction: this.fb.group({
//         enabled: [false],
//         minimumAge: [18, [Validators.min(1), Validators.max(100)]],
//       }),
//       guestVerification: this.fb.group({
//         idRequired: [true],
//         phoneRequired: [true],
//         emailRequired: [true],
//       }),
//     })
//   }

//   get customRulesArray(): FormArray {
//     return this.policiesForm.get("customRules") as FormArray
//   }

//   get isFormValid(): boolean {
//     return this.policiesForm.valid
//   }

//   get checkInTimeValue(): string {
//     return this.policiesForm.get("checkInTime")?.value || ""
//   }

//   get checkOutTimeValue(): string {
//     return this.policiesForm.get("checkOutTime")?.value || ""
//   }

//   get minimumStayValue(): number {
//     return this.policiesForm.get("minimumStay")?.value || 1
//   }

//   get maximumStayValue(): number {
//     return this.policiesForm.get("maximumStay")?.value || 30
//   }

//   get advanceBookingValue(): number {
//     return this.policiesForm.get("advanceBooking")?.value || 365
//   }

//   get instantBookingValue(): boolean {
//     return this.policiesForm.get("instantBooking")?.value || false
//   }

//   get smokingAllowedValue(): boolean {
//     return this.policiesForm.get("smokingAllowed")?.value || false
//   }

//   get petsAllowedValue(): boolean {
//     return this.policiesForm.get("petsAllowed")?.value || false
//   }

//   get partiesAllowedValue(): boolean {
//     return this.policiesForm.get("partiesAllowed")?.value || false
//   }

//   get childrenAllowedValue(): boolean {
//     return this.policiesForm.get("childrenAllowed")?.value || true
//   }

//   get additionalGuestFeeValue(): number {
//     return this.policiesForm.get("additionalGuestFee")?.value || 0
//   }

//   get securityDepositValue(): number {
//     return this.policiesForm.get("securityDeposit")?.value || 0
//   }

//   get cleaningFeeValue(): number {
//     return this.policiesForm.get("cleaningFee")?.value || 0
//   }

//   get cancellationPolicyValue(): string {
//     return this.policiesForm.get("cancellationPolicy")?.value || "flexible"
//   }

//   get houseRulesValue(): string[] {
//     return this.policiesForm.get("houseRules")?.value || []
//   }

//   get quietHoursEnabledValue(): boolean {
//     return this.policiesForm.get("quietHours.enabled")?.value || false
//   }

//   get quietHoursStartTimeValue(): string {
//     return this.policiesForm.get("quietHours.startTime")?.value || "22:00"
//   }

//   get quietHoursEndTimeValue(): string {
//     return this.policiesForm.get("quietHours.endTime")?.value || "08:00"
//   }

//   get ageRestrictionEnabledValue(): boolean {
//     return this.policiesForm.get("ageRestriction.enabled")?.value || false
//   }

//   get ageRestrictionMinimumAgeValue(): number {
//     return this.policiesForm.get("ageRestriction.minimumAge")?.value || 18
//   }

//   get guestVerificationIdRequiredValue(): boolean {
//     return this.policiesForm.get("guestVerification.idRequired")?.value || true
//   }

//   get guestVerificationPhoneRequiredValue(): boolean {
//     return this.policiesForm.get("guestVerification.phoneRequired")?.value || true
//   }

//   get guestVerificationEmailRequiredValue(): boolean {
//     return this.policiesForm.get("guestVerification.emailRequired")?.value || true
//   }

//   private async loadExistingPolicies(): Promise<void> {
//     if (!this.propertyId && !this.draftId) return

//     try {
//       this.isLoading = true
//       const endpoint = this.propertyId
//         ? `/api/properties/${this.propertyId}/policies`
//         : `/api/drafts/${this.draftId}/policies`

//       const response = await this.http.get<PolicyFormData>(endpoint).toPromise()

//       if (response) {
//         this.populateForm(response)
//       }
//     } catch (error) {
//       console.error("Error loading existing policies:", error)
//     } finally {
//       this.isLoading = false
//     }
//   }

//   private populateForm(data: PolicyFormData): void {
//     // Clear existing custom rules
//     while (this.customRulesArray.length !== 0) {
//       this.customRulesArray.removeAt(0)
//     }

//     // Add custom rules from data
//     if (data.customRules && data.customRules.length > 0) {
//       data.customRules.forEach((rule) => {
//         this.customRulesArray.push(this.fb.control(rule, Validators.required))
//       })
//     }

//     // Patch form values
//     this.policiesForm.patchValue({
//       checkInTime: data.checkInTime || "15:00",
//       checkOutTime: data.checkOutTime || "11:00",
//       minimumStay: data.minimumStay || 1,
//       maximumStay: data.maximumStay || 30,
//       advanceBooking: data.advanceBooking || 365,
//       instantBooking: data.instantBooking || false,
//       smokingAllowed: data.smokingAllowed || false,
//       petsAllowed: data.petsAllowed || false,
//       partiesAllowed: data.partiesAllowed || false,
//       childrenAllowed: data.childrenAllowed !== undefined ? data.childrenAllowed : true,
//       additionalGuestFee: data.additionalGuestFee || 0,
//       securityDeposit: data.securityDeposit || 0,
//       cleaningFee: data.cleaningFee || 0,
//       cancellationPolicy: data.cancellationPolicy || "flexible",
//       houseRules: data.houseRules || [],
//       quietHours: {
//         enabled: data.quietHours?.enabled || false,
//         startTime: data.quietHours?.startTime || "22:00",
//         endTime: data.quietHours?.endTime || "08:00",
//       },
//       ageRestriction: {
//         enabled: data.ageRestriction?.enabled || false,
//         minimumAge: data.ageRestriction?.minimumAge || 18,
//       },
//       guestVerification: {
//         idRequired: data.guestVerification?.idRequired !== undefined ? data.guestVerification.idRequired : true,
//         phoneRequired:
//           data.guestVerification?.phoneRequired !== undefined ? data.guestVerification.phoneRequired : true,
//         emailRequired:
//           data.guestVerification?.emailRequired !== undefined ? data.guestVerification.emailRequired : true,
//       },
//     })
//   }

//   addCustomRule(): void {
//     this.customRulesArray.push(this.fb.control("", Validators.required))
//   }

//   removeCustomRule(index: number): void {
//     this.customRulesArray.removeAt(index)
//   }

//   getCustomRuleControl(index: number) {
//     return this.customRulesArray.at(index)
//   }

//   isFieldInvalid(fieldName: string): boolean {
//     const field = this.policiesForm.get(fieldName)
//     return !!(field && field.invalid && (field.dirty || field.touched))
//   }

//   getFieldError(fieldName: string): string {
//     const field = this.policiesForm.get(fieldName)
//     if (field && field.errors && (field.dirty || field.touched)) {
//       if (field.errors["required"]) return `${fieldName} is required`
//       if (field.errors["min"]) return `Minimum value is ${field.errors["min"].min}`
//       if (field.errors["max"]) return `Maximum value is ${field.errors["max"].max}`
//     }
//     return ""
//   }

//   async onSubmit(): Promise<void> {
//     if (this.policiesForm.invalid) {
//       this.markFormGroupTouched()
//       return
//     }

//     try {
//       this.isSubmitting = true
//       const formData = this.preparePolicyData()

//       const endpoint = this.propertyId
//         ? `/api/properties/${this.propertyId}/policies`
//         : `/api/drafts/${this.draftId}/policies`

//       await this.http.post(endpoint, formData).toPromise()

//       // Navigate to next step or completion
//       this.navigateToNextStep()
//     } catch (error) {
//       console.error("Error saving policies:", error)
//       // Handle error (show toast, etc.)
//     } finally {
//       this.isSubmitting = false
//     }
//   }

//   private preparePolicyData(): PolicyFormData {
//     const formValue = this.policiesForm.value

//     return {
//       checkInTime: formValue.checkInTime,
//       checkOutTime: formValue.checkOutTime,
//       minimumStay: formValue.minimumStay,
//       maximumStay: formValue.maximumStay,
//       advanceBooking: formValue.advanceBooking,
//       instantBooking: formValue.instantBooking,
//       smokingAllowed: formValue.smokingAllowed,
//       petsAllowed: formValue.petsAllowed,
//       partiesAllowed: formValue.partiesAllowed,
//       childrenAllowed: formValue.childrenAllowed,
//       additionalGuestFee: formValue.additionalGuestFee,
//       securityDeposit: formValue.securityDeposit,
//       cleaningFee: formValue.cleaningFee,
//       cancellationPolicy: formValue.cancellationPolicy,
//       houseRules: formValue.houseRules,
//       customRules: formValue.customRules.filter((rule: string) => rule.trim() !== ""),
//       quietHours: formValue.quietHours,
//       ageRestriction: formValue.ageRestriction,
//       guestVerification: formValue.guestVerification,
//     }
//   }

//   private markFormGroupTouched(): void {
//     Object.keys(this.policiesForm.controls).forEach((key) => {
//       const control = this.policiesForm.get(key)
//       control?.markAsTouched()

//       if (control instanceof FormArray) {
//         control.controls.forEach((c) => c.markAsTouched())
//       }
//     })
//   }

//   private navigateToNextStep(): void {
//     // Navigate to completion or next step
//     const queryParams: any = {}

//     if (this.propertyId) {
//       queryParams.id = this.propertyId
//     } else if (this.draftId) {
//       queryParams.draft_id = this.draftId
//       queryParams.isNewFlow = true
//     }

//     this.router.navigate(["/onboarding/complete"], { queryParams })
//   }

//   goBack(): void {
//     const queryParams: any = {}

//     if (this.propertyId) {
//       queryParams.id = this.propertyId
//     } else if (this.draftId) {
//       queryParams.draft_id = this.draftId
//       queryParams.isNewFlow = true
//     }

//     this.router.navigate(["/onboarding/photos"], { queryParams })
//   }
// }

import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment"
import { apiLinks } from "src/app/core/apiLink"
import { CommonService } from "src/app/services/common.service"
import { MessageService } from "primeng/api"

interface PolicyFormData {
  checkInTime: string
  checkOutTime: string
  minimumStay: number
  maximumStay: number
  advanceBookingDays: number
  instantBooking: boolean
  smokingPolicy: string
  petPolicy: string
  eventPolicy: string
  childPolicy: string
  additionalGuestFee: number
  securityDeposit: number
  cleaningFee: number
  cancellationPolicy: string
  houseRules: string[]
  customRules: string[]
  quietHours: {
    enabled: boolean
    startTime: string
    endTime: string
    description: string
  }
  ageRestriction: {
    enabled: boolean
    minimumAge: number
    exceptions: string
  }
  guestVerification: {
    governmentId: boolean
    phoneVerification: boolean
    emailVerification: boolean
    profilePhoto: boolean
    references: boolean
  }
  damagePolicy: {
    securityDepositRequired: boolean
    amount: number
    refundPolicy: string
  }
  accessInstructions: {
    selfCheckIn: boolean
    keyLocation: string
    specialInstructions: string
  }
}

@Component({
  selector: "app-policies",
  templateUrl: "./policies.component.html",
  styleUrls: ["./policies.component.scss"],
})
export class PoliciesComponent implements OnInit {
  policiesForm!: FormGroup
  isLoading = false
  isSubmitting = false
  propertyId: string | null = null
  draftId: string | null = null

  // Dropdown options matching video specifications
  timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i
    const period = i < 12 ? "AM" : "PM"
    return {
      label: `${displayHour}:00 ${period}`,
      value: `${hour}:00`,
    }
  })

  smokingPolicyOptions = [
    { label: "No smoking anywhere", value: "no_smoking" },
    { label: "Smoking allowed outside only", value: "outside_only" },
    { label: "Smoking allowed everywhere", value: "allowed_everywhere" },
    { label: "Designated smoking areas only", value: "designated_areas" },
  ]

  petPolicyOptions = [
    { label: "No pets allowed", value: "no_pets" },
    { label: "Pets allowed with fee", value: "pets_with_fee" },
    { label: "Pets allowed free", value: "pets_free" },
    { label: "Service animals only", value: "service_only" },
    { label: "Case by case basis", value: "case_by_case" },
  ]

  eventPolicyOptions = [
    { label: "No parties or events", value: "no_events" },
    { label: "Small gatherings allowed", value: "small_gatherings" },
    { label: "Events allowed with approval", value: "with_approval" },
    { label: "All events welcome", value: "all_welcome" },
  ]

  childPolicyOptions = [
    { label: "Children welcome", value: "welcome" },
    { label: "Children allowed with restrictions", value: "with_restrictions" },
    { label: "Adults only", value: "adults_only" },
    { label: "Family-friendly property", value: "family_friendly" },
  ]

  cancellationPolicyOptions = [
    { label: "Flexible - Full refund 1 day prior", value: "flexible" },
    { label: "Moderate - Full refund 5 days prior", value: "moderate" },
    { label: "Firm - 50% refund up to 30 days prior", value: "firm" },
    { label: "Strict - 50% refund up to 7 days prior", value: "strict" },
    { label: "Super Strict 30 - 50% refund up to 30 days prior", value: "super_strict_30" },
    { label: "Super Strict 60 - 50% refund up to 60 days prior", value: "super_strict_60" },
    { label: "Non-refundable", value: "non_refundable" },
  ]

  predefinedHouseRules = [
    { label: "No smoking inside", value: "no_smoking_inside" },
    { label: "No loud music after 10 PM", value: "no_loud_music" },
    { label: "No shoes inside", value: "no_shoes_inside" },
    { label: "Keep common areas clean", value: "keep_clean" },
    { label: "No unauthorized guests", value: "no_unauthorized_guests" },
    { label: "Respect neighbors", value: "respect_neighbors" },
    { label: "No illegal substances", value: "no_illegal_substances" },
    { label: "Check out on time", value: "checkout_on_time" },
    { label: "Turn off lights when leaving", value: "turn_off_lights" },
    { label: "Lock doors when leaving", value: "lock_doors" },
    { label: "No food in bedrooms", value: "no_food_bedrooms" },
    { label: "Quiet hours 10 PM - 8 AM", value: "quiet_hours" },
  ]

  refundPolicyOptions = [
    { label: "Full refund if no damage", value: "full_refund" },
    { label: "Partial refund based on damage assessment", value: "partial_refund" },
    { label: "Case by case evaluation", value: "case_by_case" },
    { label: "Non-refundable", value: "non_refundable" },
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService,
    private messageService: MessageService
  ) {
    this.initializeForm()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params["id"] || null
      // this.draftId = params["draft_id"] || null
      this.loadExistingPolicies()
    })
  }

  private initializeForm(): void {
    this.policiesForm = this.fb.group({
      checkInTime: ["15:00", Validators.required],
      checkOutTime: ["11:00", Validators.required],
      minimumStay: [1, [Validators.required, Validators.min(1), Validators.max(365)]],
      maximumStay: [30, [Validators.required, Validators.min(1), Validators.max(365)]],
      advanceBookingDays: [365, [Validators.required, Validators.min(0), Validators.max(730)]],
      instantBooking: [false],
      smokingPolicy: ["no_smoking", Validators.required],
      petPolicy: ["no_pets", Validators.required],
      eventPolicy: ["no_events", Validators.required],
      childPolicy: ["welcome", Validators.required],
      additionalGuestFee: [0, [Validators.min(0), Validators.max(1000)]],
      securityDeposit: [0, [Validators.min(0), Validators.max(10000)]],
      cleaningFee: [0, [Validators.min(0), Validators.max(1000)]],
      cancellationPolicy: ["flexible", Validators.required],
      houseRules: [[]],
      customRules: this.fb.array([]),
      quietHours: this.fb.group({
        enabled: [false],
        startTime: ["22:00"],
        endTime: ["08:00"],
        description: [""],
      }),
      ageRestriction: this.fb.group({
        enabled: [false],
        minimumAge: [18, [Validators.min(1), Validators.max(100)]],
        exceptions: [""],
      }),
      guestVerification: this.fb.group({
        governmentId: [true],
        phoneVerification: [true],
        emailVerification: [true],
        profilePhoto: [false],
        references: [false],
      }),
      damagePolicy: this.fb.group({
        securityDepositRequired: [false],
        amount: [0, [Validators.min(0), Validators.max(10000)]],
        refundPolicy: ["full_refund"],
      }),
      accessInstructions: this.fb.group({
        selfCheckIn: [false],
        keyLocation: [""],
        specialInstructions: [""],
      }),
    })

    // Set up form value change subscriptions for dynamic behavior
    this.setupFormSubscriptions()
  }

  private setupFormSubscriptions(): void {
    // Minimum stay should not exceed maximum stay
    this.policiesForm.get("minimumStay")?.valueChanges.subscribe((minStay) => {
      const maxStay = this.policiesForm.get("maximumStay")?.value
      if (minStay && maxStay && minStay > maxStay) {
        this.policiesForm.get("maximumStay")?.setValue(minStay)
      }
    })

    // Maximum stay should not be less than minimum stay
    this.policiesForm.get("maximumStay")?.valueChanges.subscribe((maxStay) => {
      const minStay = this.policiesForm.get("minimumStay")?.value
      if (maxStay && minStay && maxStay < minStay) {
        this.policiesForm.get("minimumStay")?.setValue(maxStay)
      }
    })

    // Security deposit requirement affects damage policy
    this.policiesForm.get("damagePolicy.securityDepositRequired")?.valueChanges.subscribe((required) => {
      const amountControl = this.policiesForm.get("damagePolicy.amount")
      if (required) {
        amountControl?.setValidators([Validators.required, Validators.min(1), Validators.max(10000)])
      } else {
        amountControl?.setValidators([Validators.min(0), Validators.max(10000)])
        amountControl?.setValue(0)
      }
      amountControl?.updateValueAndValidity()
    })

    // Self check-in affects key location requirement
    this.policiesForm.get("accessInstructions.selfCheckIn")?.valueChanges.subscribe((selfCheckIn) => {
      const keyLocationControl = this.policiesForm.get("accessInstructions.keyLocation")
      if (selfCheckIn) {
        keyLocationControl?.setValidators([Validators.required])
      } else {
        keyLocationControl?.setValidators([])
        keyLocationControl?.setValue("")
      }
      keyLocationControl?.updateValueAndValidity()
    })

    // Age restriction affects minimum age requirement
    this.policiesForm.get("ageRestriction.enabled")?.valueChanges.subscribe((enabled) => {
      const minAgeControl = this.policiesForm.get("ageRestriction.minimumAge")
      if (enabled) {
        minAgeControl?.setValidators([Validators.required, Validators.min(1), Validators.max(100)])
      } else {
        minAgeControl?.setValidators([Validators.min(1), Validators.max(100)])
      }
      minAgeControl?.updateValueAndValidity()
    })

    // Quiet hours enabled affects time requirements
    this.policiesForm.get("quietHours.enabled")?.valueChanges.subscribe((enabled) => {
      const startTimeControl = this.policiesForm.get("quietHours.startTime")
      const endTimeControl = this.policiesForm.get("quietHours.endTime")

      if (enabled) {
        startTimeControl?.setValidators([Validators.required])
        endTimeControl?.setValidators([Validators.required])
      } else {
        startTimeControl?.setValidators([])
        endTimeControl?.setValidators([])
      }
      startTimeControl?.updateValueAndValidity()
      endTimeControl?.updateValueAndValidity()
    })
  }

  // Getter methods for template access (Angular 14 compatible)
  get customRulesArray(): FormArray {
    return this.policiesForm.get("customRules") as FormArray
  }

  get isFormValid(): boolean {
    return this.policiesForm.valid
  }

  get hasFormErrors(): boolean {
    return this.policiesForm.invalid && (this.policiesForm.dirty || this.policiesForm.touched)
  }

  get formErrorCount(): number {
    let errorCount = 0
    Object.keys(this.policiesForm.controls).forEach((key) => {
      const control = this.policiesForm.get(key)
      if (control?.invalid && (control.dirty || control.touched)) {
        errorCount++
      }
    })
    return errorCount
  }

  // Individual field getters
  get checkInTimeValue(): string {
    return this.policiesForm.get("checkInTime")?.value || "15:00"
  }

  get checkOutTimeValue(): string {
    return this.policiesForm.get("checkOutTime")?.value || "11:00"
  }

  get minimumStayValue(): number {
    return this.policiesForm.get("minimumStay")?.value || 1
  }

  get maximumStayValue(): number {
    return this.policiesForm.get("maximumStay")?.value || 30
  }

  get advanceBookingDaysValue(): number {
    return this.policiesForm.get("advanceBookingDays")?.value || 365
  }

  get instantBookingValue(): boolean {
    return this.policiesForm.get("instantBooking")?.value || false
  }

  get smokingPolicyValue(): string {
    return this.policiesForm.get("smokingPolicy")?.value || "no_smoking"
  }

  get petPolicyValue(): string {
    return this.policiesForm.get("petPolicy")?.value || "no_pets"
  }

  get eventPolicyValue(): string {
    return this.policiesForm.get("eventPolicy")?.value || "no_events"
  }

  get childPolicyValue(): string {
    return this.policiesForm.get("childPolicy")?.value || "welcome"
  }

  get additionalGuestFeeValue(): number {
    return this.policiesForm.get("additionalGuestFee")?.value || 0
  }

  get securityDepositValue(): number {
    return this.policiesForm.get("securityDeposit")?.value || 0
  }

  get cleaningFeeValue(): number {
    return this.policiesForm.get("cleaningFee")?.value || 0
  }

  get cancellationPolicyValue(): string {
    return this.policiesForm.get("cancellationPolicy")?.value || "flexible"
  }

  get houseRulesValue(): string[] {
    return this.policiesForm.get("houseRules")?.value || []
  }

  get quietHoursEnabledValue(): boolean {
    return this.policiesForm.get("quietHours.enabled")?.value || false
  }

  get quietHoursStartTimeValue(): string {
    return this.policiesForm.get("quietHours.startTime")?.value || "22:00"
  }

  get quietHoursEndTimeValue(): string {
    return this.policiesForm.get("quietHours.endTime")?.value || "08:00"
  }

  get quietHoursDescriptionValue(): string {
    return this.policiesForm.get("quietHours.description")?.value || ""
  }

  get ageRestrictionEnabledValue(): boolean {
    return this.policiesForm.get("ageRestriction.enabled")?.value || false
  }

  get ageRestrictionMinimumAgeValue(): number {
    return this.policiesForm.get("ageRestriction.minimumAge")?.value || 18
  }

  get ageRestrictionExceptionsValue(): string {
    return this.policiesForm.get("ageRestriction.exceptions")?.value || ""
  }

  get guestVerificationGovernmentIdValue(): boolean {
    return this.policiesForm.get("guestVerification.governmentId")?.value || true
  }

  get guestVerificationPhoneValue(): boolean {
    return this.policiesForm.get("guestVerification.phoneVerification")?.value || true
  }

  get guestVerificationEmailValue(): boolean {
    return this.policiesForm.get("guestVerification.emailVerification")?.value || true
  }

  get guestVerificationProfilePhotoValue(): boolean {
    return this.policiesForm.get("guestVerification.profilePhoto")?.value || false
  }

  get guestVerificationReferencesValue(): boolean {
    return this.policiesForm.get("guestVerification.references")?.value || false
  }

  get damagePolicySecurityDepositRequiredValue(): boolean {
    return this.policiesForm.get("damagePolicy.securityDepositRequired")?.value || false
  }

  get damagePolicyAmountValue(): number {
    return this.policiesForm.get("damagePolicy.amount")?.value || 0
  }

  get damagePolicyRefundPolicyValue(): string {
    return this.policiesForm.get("damagePolicy.refundPolicy")?.value || "full_refund"
  }

  get accessInstructionsSelfCheckInValue(): boolean {
    return this.policiesForm.get("accessInstructions.selfCheckIn")?.value || false
  }

  get accessInstructionsKeyLocationValue(): string {
    return this.policiesForm.get("accessInstructions.keyLocation")?.value || ""
  }

  get accessInstructionsSpecialInstructionsValue(): string {
    return this.policiesForm.get("accessInstructions.specialInstructions")?.value || ""
  }

  private async loadExistingPolicies(): Promise<void> {
    if (!this.propertyId) return

    try {
      this.isLoading = true
      const endpoint = this.propertyId
        ? `/api/properties/${this.propertyId}/policies`
        : `/api/drafts/${this.draftId}/policies`

      const response = await this.http.get<PolicyFormData>(endpoint).toPromise()

      if (response) {
        this.populateForm(response)
      }
    } catch (error) {
      console.error("Error loading existing policies:", error)
    } finally {
      this.isLoading = false
    }
  }

  private populateForm(data: PolicyFormData): void {
    // Clear existing custom rules
    while (this.customRulesArray.length !== 0) {
      this.customRulesArray.removeAt(0)
    }

    // Add custom rules from data
    if (data.customRules && data.customRules.length > 0) {
      data.customRules.forEach((rule) => {
        this.customRulesArray.push(this.fb.control(rule, Validators.required))
      })
    }

    // Patch form values
    this.policiesForm.patchValue(data)
  }

  addCustomRule(): void {
    this.customRulesArray.push(this.fb.control("", Validators.required))
  }

  removeCustomRule(index: number): void {
    this.customRulesArray.removeAt(index)
  }

  getCustomRuleControl(index: number) {
    return this.customRulesArray.at(index)
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.policiesForm.get(fieldName)
    return !!(field && field.invalid && (field.dirty || field.touched))
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.policiesForm.get(fieldName)
    return !!(field && field.valid && (field.dirty || field.touched))
  }

  getFieldError(fieldName: string): string {
    const field = this.policiesForm.get(fieldName)
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors["required"]) return `This field is required`
      if (field.errors["min"]) return `Minimum value is ${field.errors["min"].min}`
      if (field.errors["max"]) return `Maximum value is ${field.errors["max"].max}`
    }
    return ""
  }

  async onSubmit(): Promise<void> {
    if (this.policiesForm.invalid) {
      this.markFormGroupTouched()
      console.log("Form is invalid, please correct the errors.", this.policiesForm.value);
      return
    }

    try {
      this.isSubmitting = true
      const formData = this.preparePolicyData()
      this.commonService.postCommonHttpClient(apiLinks.properties.saveBasicInfo, this.policiesForm.value).subscribe((res: any) => {
        console.log("result", res);
        this.messageService.add({
          severity: "success",
          summary: "Policies Info Saved",
          detail: "Your Policies info has been saved",
          life: 3000,
        });
        // Navigate back to dashboard
        this.router.navigate([`/onboarding/finance`], {
          queryParams: {
            id: this.propertyId,
            // draft_id: this.draftId,
          },
        })
      })

      // const endpoint = this.propertyId
      //   ? `${environment.apiUrl}/properties/${this.propertyId}`
      //   : `${environment.apiUrl}/properties/f4f5293f-af57-411f-8db0-bd18b56ee4f9`

      // const token = localStorage.getItem('accessToken');
      // const headers = { Authorization: `Bearer ${token}` }
      // await this.http.put(endpoint, formData, {headers}).toPromise()

      // // Navigate to next step or completion
      // this.navigateToNextStep()
    } catch (error) {
      console.error("Error saving policies:", error)
      this.messageService.add({
        severity: "error",
        summary: " Error",
        detail: "Error occured try again!",
        life: 3000,
      })
      // Handle error (show toast, etc.)
    } finally {
      this.isSubmitting = false
    }
  }

  private preparePolicyData(): PolicyFormData {
    const formValue = this.policiesForm.value

    return {
      checkInTime: formValue.checkInTime,
      checkOutTime: formValue.checkOutTime,
      minimumStay: formValue.minimumStay,
      maximumStay: formValue.maximumStay,
      advanceBookingDays: formValue.advanceBookingDays,
      instantBooking: formValue.instantBooking,
      smokingPolicy: formValue.smokingPolicy,
      petPolicy: formValue.petPolicy,
      eventPolicy: formValue.eventPolicy,
      childPolicy: formValue.childPolicy,
      additionalGuestFee: formValue.additionalGuestFee,
      securityDeposit: formValue.securityDeposit,
      cleaningFee: formValue.cleaningFee,
      cancellationPolicy: formValue.cancellationPolicy,
      houseRules: formValue.houseRules,
      customRules: formValue.customRules.filter((rule: string) => rule.trim() !== ""),
      quietHours: formValue.quietHours,
      ageRestriction: formValue.ageRestriction,
      guestVerification: formValue.guestVerification,
      damagePolicy: formValue.damagePolicy,
      accessInstructions: formValue.accessInstructions,
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.policiesForm.controls).forEach((key) => {
      const control = this.policiesForm.get(key)
      control?.markAsTouched()

      if (control instanceof FormArray) {
        control.controls.forEach((c) => c.markAsTouched())
      }
    })
  }

  private navigateToNextStep(): void {
    const queryParams: any = {}

    if (this.propertyId) {
      queryParams.id = this.propertyId
    } else if (this.draftId) {
      queryParams.draft_id = this.draftId
      queryParams.isNewFlow = true
    }


    this.router.navigate(["/onboarding/complete"], { queryParams })
  }

  goBack(): void {
    const queryParams: any = {}

    if (this.propertyId) {
      queryParams.id = this.propertyId
    } else if (this.draftId) {
      queryParams.draft_id = this.draftId
      queryParams.isNewFlow = true
    }

    this.router.navigate([`/onboarding/photos/${this.propertyId}`], { queryParams })
  }

  // example output value

  // {
  //   checkInTime: "15:00",
  //   checkOutTime: "11:00",
  //   minimumStay: 1,
  //   maximumStay: 30,
  //   advanceBookingDays: 365,
  //   instantBooking: false,
  //   smokingPolicy: "no_smoking",
  //   petPolicy: "no_pets",
  //   eventPolicy: "no_events",
  //   childPolicy: "welcome",
  //   additionalGuestFee: 0,
  //   securityDeposit: 0,
  //   cleaningFee: 0,
  //   cancellationPolicy: "flexible",
  //   houseRules: ["no_smoking_inside", "no_loud_music"],
  //   customRules: ["Custom rule 1", "Custom rule 2"],
  //   quietHours: {
  //     enabled: true,
  //     startTime: "22:00",
  //     endTime: "08:00",
  //     description: "Please keep noise to a minimum"
  //   },
  //   ageRestriction: {
  //     enabled: false,
  //     minimumAge: 18,
  //     exceptions: ""
  //   },
  //   guestVerification: {
  //     governmentId: true,
  //     phoneVerification: true,
  //     emailVerification: true,
  //     profilePhoto: false,
  //     references: false
  //   },
  //   damagePolicy: {
  //     securityDepositRequired: false,
  //     amount: 0,
  //     refundPolicy: "full_refund"
  //   },
  //   accessInstructions: {
  //     selfCheckIn: false,
  //     keyLocation: "",
  //     specialInstructions: ""
  //   }
  // }
}
