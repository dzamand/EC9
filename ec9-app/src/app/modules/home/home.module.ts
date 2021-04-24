import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {DashboardService} from "./components/dashboard/dashboard.service";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, DashboardComponent],
  exports: [HomeComponent],
  providers: [DashboardService]
})
export class HomeModule {

}
