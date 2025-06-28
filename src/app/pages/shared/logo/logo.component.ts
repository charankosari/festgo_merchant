import { Component, Input, OnInit } from "@angular/core"
import { WhiteLabelService } from "../../../services/white-label.service"
import { Observable } from "rxjs"
import { WhiteLabelConfig } from "../../../services/white-label.service"

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"],
})
export class LogoComponent implements OnInit {
  @Input() size: "small" | "medium" | "large" = "medium"

  config$: Observable<WhiteLabelConfig>

  constructor(private whiteLabelService: WhiteLabelService) {
    this.config$ = this.whiteLabelService.config$
  }

  ngOnInit(): void {}

  get logoSizeClass(): string {
    return `logo-${this.size}`
  }
}
