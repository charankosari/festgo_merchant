import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  isDarkTheme = false

  constructor() {}

  initTheme(): void {
    // Check for system preference
    // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    // this.isDarkTheme = prefersDark
    this.updateTheme()

    // Listen for changes in system preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      this.isDarkTheme = e.matches
      this.updateTheme()
    })
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme
    this.updateTheme()
  }

  private updateTheme(): void {
    if (this.isDarkTheme) {
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    } else {
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }
  }
}
