import {ChangeDetectionStrategy, Component} from "@angular/core";
import {DashboardCard, DashboardService} from "./dashboard.service";
import {Observable} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  public _cards$: Observable<DashboardCard[]> = this.service.getDashboardCards();

  constructor(private service: DashboardService) {
  }

  public _onCreateNew(): void {
    this.service.createRandomCard()
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public _onUpdateDescription(cardId: string): void {
    this.service.updateCardDescription(cardId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public _onRemoveCard(cardId: string): void {
    this.service.removeCard(cardId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

}
