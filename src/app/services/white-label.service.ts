import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export interface WhiteLabelConfig {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoType: "default" | "custom"
  logoUrl?: string
  logoText: string
  favicon?: string
  companyName: string
  loginBackgroundColor: string
}

@Injectable({
  providedIn: "root",
})
export class WhiteLabelService {
  // Default configuration
  private defaultConfig: WhiteLabelConfig = {
    primaryColor: "#f05a29", // Current orange color
    secondaryColor: "#c04821", // Current dark gray
    accentColor: "#304c8e", // Current accent blue
    logoType: "default",
    logoText: "connect",
    companyName: "FestGo",
    loginBackgroundColor: "#0a2647", // Dark blue for login background
  }

  private configSubject = new BehaviorSubject<WhiteLabelConfig>(this.defaultConfig)
  public config$ = this.configSubject.asObservable()

  constructor() {
    this.loadConfig()
  }

  private loadConfig(): void {
    // In a real app, this would load from an API or local storage
    // For now, we'll just use the default config
    const storedConfig = localStorage.getItem("whiteLabelConfig")

    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig)
        this.configSubject.next({ ...this.defaultConfig, ...parsedConfig })
        this.applyThemeColors()
      } catch (e) {
        console.error("Error parsing stored white label config", e)
        this.resetToDefault()
      }
    } else {
      this.resetToDefault()
    }
  }

  updateConfig(config: Partial<WhiteLabelConfig>): void {
    const currentConfig = this.configSubject.value
    const newConfig = { ...currentConfig, ...config }

    // Save to localStorage
    localStorage.setItem("whiteLabelConfig", JSON.stringify(newConfig))

    // Update the subject
    this.configSubject.next(newConfig)

    // Apply the theme colors
    this.applyThemeColors()
  }

  resetToDefault(): void {
    localStorage.removeItem("whiteLabelConfig")
    this.configSubject.next(this.defaultConfig)
    this.applyThemeColors()
  }

  getWhiteLabelConfig(): WhiteLabelConfig {
    return this.configSubject.value
  }

  private applyThemeColors(): void {
    const config = this.configSubject.value

    // Apply CSS variables to the document root
    document.documentElement.style.setProperty("--primary-color", config.primaryColor)
    document.documentElement.style.setProperty("--secondary-color", config.secondaryColor)
    document.documentElement.style.setProperty("--accent-color", config.accentColor)
    document.documentElement.style.setProperty("--login-bg-color", config.loginBackgroundColor)

    // Generate lighter and darker variants
    document.documentElement.style.setProperty("--primary-light", this.lightenColor(config.primaryColor, 40))
    document.documentElement.style.setProperty("--primary-dark", this.darkenColor(config.primaryColor, 20))

    // Update favicon if provided
    if (config.favicon) {
      const linkElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (linkElement) {
        linkElement.href = config.favicon
      }
    }
  }

  // Helper function to lighten a color
  private lightenColor(color: string, percent: number): string {
    const num = Number.parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  // Helper function to darken a color
  private darkenColor(color: string, percent: number): string {
    const num = Number.parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) - amt
    const G = ((num >> 8) & 0x00ff) - amt
    const B = (num & 0x0000ff) - amt

    return (
      "#" + (0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0)).toString(16).slice(1)
    )
  }
}
