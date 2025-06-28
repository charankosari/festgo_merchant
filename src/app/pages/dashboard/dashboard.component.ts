import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from "@angular/core"
import  { FormBuilder } from "@angular/forms"
import  { Router } from "@angular/router"
import  { ThemeService } from "../../services/theme.service"
import  { AuthService } from "../../services/auth.service"
import  { MessageService } from "primeng/api"
import { CommonService } from "src/app/services/common.service"
import { apiLinks } from "src/app/core/apiLink"

interface Property {
  id: number
  name: string
  address?: string
  status: string
  completion?: number
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  activeTab = "active"

  // Mock data
  activeProperties: Property[] = []
  inProgressProperties: Property[] = [
    {
      id: 1,
      name: "Dream Land",
      status: "Policies Added",
      completion: 70,
    },
  ]

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private messageService: MessageService,
    public commonService: CommonService
  ) {}

  userId: any;
  ngOnInit(): void {
    // You could load real data from a service here
    let user: any = localStorage.getItem('userData');
    let userData = JSON.parse(user)
    console.log("token of user Data; ", userData, userData?.id);
    this.userId = userData?.id
    this.loadActiveProperties();    
  }

  loadActiveProperties(): void {
    this.activeProperties = [
      { id: 1, name: "Sunset Villa", address: "123 Beach St", status: "Active" },
      { id: 2, name: "Mountain Retreat", address: "456 Hill Rd", status: "Active" },
      { id: 3, name: "City Apartment", address: "789 Urban Ave", status: "Active" },
    ];

    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` }
    this.httpClient.get(apiLinks.home.propertyList+this.userId, {headers}).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.activeProperties = data.map((property: any) => ({
            id: property.id,
            name: property.name,
            address: property.address,
            status: property.status,
          }))
        } else {
          this.messageService.add({
            severity: "info",
            summary: "No Active Properties",
            detail: "You have no active properties at the moment.",
          })
        }
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error Loading Properties",
          detail: "An error occurred while loading your properties.",
        })
        console.error("Error loading properties:", error)
      }
    )
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  viewInProgressProperties(): void {
    this.activeTab = "inProgress"
  }

  listNewProperty(): void {
    // Navigate to the onboarding route
    this.router.navigate(["/property-type-selection"]);
  }

  continueEditing(property: Property): void {
    // Navigate to the onboarding route with the property ID
    this.router.navigate(["/onboarding/basic-info"], {
      queryParams: { id: property.id },
    })
  }
}
