import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from '@angular/router';

// PrimeNG Components
import { InputTextModule } from "primeng/inputtext"
import { CheckboxModule } from "primeng/checkbox"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { DividerModule } from "primeng/divider"
import { ToggleButtonModule } from "primeng/togglebutton"
import { DialogModule } from "primeng/dialog"
import { ToastModule } from "primeng/toast"
import { MessageService } from "primeng/api"
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';


// Components
import { AuthComponent } from './auth/auth.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { OnboardingComponent } from './pages/onboarding/onboarding/onboarding.component';
import { BasicInfoComponent } from './pages/onboarding/basic-info/basic-info.component';
import { AppLayoutComponent } from './pages/shared/app-layout/app-layout.component';
import { WhiteLabelConfigComponent } from './admin/white-label-config/white-label-config.component';
import { LogoComponent } from './pages/shared/logo/logo.component';
import { AppComponent } from './app.component';
import { BrandingSettingsComponent } from './admin/brand-settings/brand-settings.component';
import { PropertyTypeSelectionComponent } from './pages/property-type-selection/property-type-selection.component';
import { LocationComponent } from './pages/onboarding/location/location.component';
import { AmenitiesComponent } from './pages/onboarding/amenities/amenities.component';
import { FinanceLegalComponent } from './pages/onboarding/finance-legal/finance-legal.component';
// import { OnboardingModule } from './pages/onboarding/onboarding.module';
import { PoliciesComponent } from './pages/onboarding/policies/policies.component';
import { RoomFormComponent } from './pages/onboarding/room-form/room-form.component';
import { CreateRoomComponent } from './pages/onboarding/create-room/create-room.component';
import { RoomsComponent } from './pages/onboarding/rooms/rooms.component';
import { RoomAmenitiesComponent } from './pages/onboarding/room-amenities/room-amenities.component';
import { UploadsComponent } from './pages/onboarding/uploads/uploads.component';

@NgModule({
  declarations: [
    AppComponent, 
    AuthComponent,
    ThemeToggleComponent, 
    DashboardComponent, 
    ProfileComponent, 
    OnboardingComponent, 
    BasicInfoComponent, 
    PoliciesComponent,
    AppLayoutComponent, 
    BrandingSettingsComponent, 
    WhiteLabelConfigComponent, 
    LogoComponent, 
    PropertyTypeSelectionComponent, 
    LocationComponent, 
    AmenitiesComponent, 
    FinanceLegalComponent, 
    RoomFormComponent,
    CreateRoomComponent,
    RoomsComponent,
    RoomAmenitiesComponent,
    UploadsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    // OnboardingModule,
    InputTextModule,
    CheckboxModule,
    InputSwitchModule,
    CardModule,
    DividerModule,
    ToggleButtonModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    MultiSelectModule,
    SelectButtonModule,
    DropdownModule,
    MultiSelectModule,
    StyleClassModule,
    AccordionModule,
    RadioButtonModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
