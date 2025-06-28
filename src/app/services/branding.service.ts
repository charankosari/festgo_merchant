import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export interface BrandingConfig {
  // Company/Product Information
  companyName: string
  productName: string

  // Logo Configuration
  logoType: "text" | "image" | "both"
  logoText: string
  logoImageUrl: string
  logoImageAlt: string
  favicon: string

  // Color Scheme
  primaryColor: string
  secondaryColor: string
  accentColor: string

  // Login/Auth Screen
  loginBackgroundColor: string
  loginBrandingImageUrl: string
  loginWelcomeText: string
  loginSubText: string

  // Additional Branding
  footerText: string
  copyrightText: string
  supportEmail: string
  supportPhone: string
}

@Injectable({
  providedIn: "root",
})
export class BrandingService {
  public defaultConfig: BrandingConfig = {
    // Company/Product Information
    companyName: "MaterialM",
    productName: "Connect",

    // Logo Configuration
    logoType: "both",
    logoText: "connect",
    logoImageUrl: "assets/images/logo.png",
    logoImageAlt: "MaterialM Connect Logo",
    favicon: "favicon.ico",

    // Color Scheme
    primaryColor: "#f05a29", // Orange theme color
    secondaryColor: "#4a4a4a", // Dark gray
    accentColor: "#304c8e", // Blue accent

    // Login/Auth Screen
    loginBackgroundColor: "#0a2647",
    loginBrandingImageUrl: "assets/images/login-branding.jpg",
    loginWelcomeText: "Welcome to MaterialM",
    loginSubText:
      "MaterialM helps developers to build organized and well coded dashboards full of beautiful and rich modules.",

    // Additional Branding
    footerText: "Powered by MaterialM",
    copyrightText: `© ${new Date().getFullYear()} MaterialM. All rights reserved.`,
    supportEmail: "support@materialm.com",
    supportPhone: "+1 (555) 123-4567",
  }

  private _brandingConfig = new BehaviorSubject<BrandingConfig>(this.defaultConfig)
  public brandingConfig$ = this._brandingConfig.asObservable()

  constructor() {
    this.loadBrandingConfig()
  }

  get config(): BrandingConfig {
    return this._brandingConfig.value
  }

  /**
   * Loads branding configuration from storage or API
   */
  private loadBrandingConfig(): void {
    // Try to load from localStorage first
    const storedConfig = localStorage.getItem("branding_config")

    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig)
        this.updateBrandingConfig(parsedConfig)
        return
      } catch (e) {
        console.error("Error parsing stored branding config:", e)
      }
    }

    // If no stored config, try to load from environment or API
    this.loadBrandingConfigFromApi()
  }

  /**
   * Loads branding configuration from API
   * In a real application, this would make an API call to fetch client-specific branding
   */
  private loadBrandingConfigFromApi(): void {
    // Mock API call - in a real app, this would be an HTTP request
    // For demo purposes, we'll just use the default config
    setTimeout(() => {
      // Simulate API response
      this.updateBrandingConfig(this.defaultConfig)
    }, 100)
  }

  /**
   * Updates the branding configuration
   */
  public updateBrandingConfig(config: Partial<BrandingConfig>): void {
    const updatedConfig = { ...this._brandingConfig.value, ...config }
    this._brandingConfig.next(updatedConfig)

    // Save to localStorage for persistence
    localStorage.setItem("branding_config", JSON.stringify(updatedConfig))

    // Update CSS variables for colors
    this.updateCssVariables(updatedConfig)

    // Update favicon
    this.updateFavicon(updatedConfig.favicon)
  }

  /**
   * Updates CSS variables for theming
   */
  private updateCssVariables(config: BrandingConfig): void {
    document.documentElement.style.setProperty("--primary-color", config.primaryColor)
    document.documentElement.style.setProperty("--secondary-color", config.secondaryColor)
    document.documentElement.style.setProperty("--accent-color", config.accentColor)
    document.documentElement.style.setProperty("--login-bg-color", config.loginBackgroundColor)

    // Generate lighter/darker variants for hover states, etc.
    const primaryLight = this.adjustColor(config.primaryColor, 20)
    const primaryDark = this.adjustColor(config.primaryColor, -20)

    document.documentElement.style.setProperty("--primary-color-light", primaryLight)
    document.documentElement.style.setProperty("--primary-color-dark", primaryDark)
  }

  /**
   * Updates the favicon
   */
  private updateFavicon(faviconPath: string): void {
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link")
    link.setAttribute("rel", "shortcut icon")
    link.setAttribute("href", faviconPath)
    document.getElementsByTagName("head")[0].appendChild(link)
  }

  /**
   * Helper function to lighten or darken a color
   * @param color - Hex color code
   * @param amount - Amount to lighten (positive) or darken (negative)
   */
  private adjustColor(color: string, amount: number): string {
    return color // Simplified for now - in a real app, implement color adjustment logic
  }
}
