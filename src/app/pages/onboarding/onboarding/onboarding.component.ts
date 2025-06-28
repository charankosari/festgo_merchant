import { Component,  OnInit } from "@angular/core"
import  { Router, ActivatedRoute } from "@angular/router"
import  { ThemeService } from "../../../services/theme.service"

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent implements OnInit {
  // Onboarding steps
  steps = [
    { id: "basic-info", label: "Basic Info", active: true, completed: false },
    { id: "location", label: "Location", active: false, completed: false },
    { id: "amenities", label: "Amenities", active: false, completed: false },
    { id: "rooms", label: "Rooms", active: false, completed: false },
    { id: "photos", label: "Photos And Videos", active: false, completed: false },
    { id: "policies", label: "Policies", active: false, completed: false },
    { id: "finance", label: "Finance & Legal", active: false, completed: false },
  ]

  currentStep = "basic-info"
  propertyType = "Hotel"
  propertyId: string | null = null
  draftId: string | null = null

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Get route parameters
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params["id"] || null
      this.draftId = params["draft_id"] || null

      // Update current step based on URL
      this.route.firstChild?.url.subscribe((segments) => {
        if (segments.length > 0) {
          this.currentStep = segments[0].path
          this.updateSteps(this.currentStep)
        }
      })
    })
  }

  updateSteps(currentStepId: string): void {
    let foundCurrent = false

    this.steps.forEach((step) => {
      if (step.id === currentStepId) {
        step.active = true
        foundCurrent = true
      } else {
        step.active = false
        step.completed = !foundCurrent
      }
    })
  }

  navigateToStep(stepId: string): void {
    const url = `/onboarding/${stepId}`

    // Add query parameters if they exist
    const queryParams: any = {}

    if (this.propertyId) {
      queryParams.id = this.propertyId
    } else if (this.draftId) {
      queryParams.draft_id = this.draftId
      queryParams.isNewFlow = true
    }

    this.router.navigate([url], { queryParams })
  }
}
