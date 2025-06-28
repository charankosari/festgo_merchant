import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { AuthComponent } from "./auth/auth.component"
import { WhiteLabelConfigComponent } from "./admin/white-label-config/white-label-config.component"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { AuthGuard } from "./guard/auth.guard"
import { ProfileComponent } from "./pages/profile/profile.component"
import { OnboardingComponent } from "./pages/onboarding/onboarding/onboarding.component"
import { BasicInfoComponent } from "./pages/onboarding/basic-info/basic-info.component"
import { PropertyTypeSelectionComponent } from "./pages/property-type-selection/property-type-selection.component"
import { LocationComponent } from "./pages/onboarding/location/location.component"
import { AmenitiesComponent } from "./pages/onboarding/amenities/amenities.component"
import { FinanceLegalComponent } from "./pages/onboarding/finance-legal/finance-legal.component"
import { PoliciesComponent } from "./pages/onboarding/policies/policies.component"
import { RoomsComponent } from "./pages/onboarding/rooms/rooms.component"
import { CreateRoomComponent } from "./pages/onboarding/create-room/create-room.component"
import { UploadsComponent } from "./pages/onboarding/uploads/uploads.component"


const routes: Routes = [
  { path: "login", component: AuthComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "onboarding",
    component: OnboardingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'policies', component: PoliciesComponent
      },
      { 
        path: "basic-info", component: BasicInfoComponent 
      },
      { 
        path: "location", component: LocationComponent 
      },
      { 
        path: "amenities", component: AmenitiesComponent 
      },
      { 
        path: "policies", component: PoliciesComponent
      },
      { 
        path: "finance", component: FinanceLegalComponent 
      },
      { 
        path: "photos", component: UploadsComponent
      },
      { 
        path: "rooms", 
        // component: RoomsComponent, 
        canActivate: [AuthGuard],
        children: [
          { 
            path: "list", component: RoomsComponent,
          },
          {
            path: "create", component: CreateRoomComponent
          },
          {
            path: "edit/:id", component: CreateRoomComponent
          },
          {
            path: "view/:id", component: CreateRoomComponent
          },
          {
            path: "", component: RoomsComponent
          }
        ]
      },
      { 
        path: "", redirectTo: "basic-info", pathMatch: "full" 
      },
    ]
  },
  {
    path: "property-type-selection",
    component: PropertyTypeSelectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/white-label",
    component: WhiteLabelConfigComponent,
    canActivate: [AuthGuard],
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "/dashboard" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
