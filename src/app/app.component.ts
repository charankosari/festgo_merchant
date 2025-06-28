import { Component,  OnInit } from "@angular/core"
import  { ThemeService } from "./services/theme.service"
import {  Router, NavigationEnd } from "@angular/router"
import { filter } from "rxjs/operators"
import  { AuthService } from "./services/auth.service"
import  { WhiteLabelService } from "./services/white-label.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "angular-auth"

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private authService: AuthService,
    private whiteLabelService: WhiteLabelService,
  ) {}

  ngOnInit() {
    // Initialize theme based on system preference
    this.themeService.initTheme()

    // Initialize white label configuration
    // This will load from localStorage or use defaults

    // Check authentication status on app initialization
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"])
    }

    // Subscribe to router events to check auth on navigation
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      // If user is not on login page and not authenticated, redirect to login
      if (!this.router.url.includes("/login") && !this.authService.isAuthenticated()) {
        this.router.navigate(["/login"])
      }
    })
  }
}
