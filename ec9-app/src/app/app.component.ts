import {AuthService} from "./core/services/auth.service";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.authService.initService();
  }
}
