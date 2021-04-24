import {CRUDService} from "../../../../core/services/crud.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RandomUtil} from "../../../../core/utils/random.util";
import {UuidUtil} from "../../../../core/utils/uuid.util";

export type DashboardCard = Readonly<{
  id?: string;
  uuid: string;
  name: string;
  description: string;
}>;

@Injectable()
export class DashboardService {

  private readonly COLLECTION_NAME = "dashboardCards";

  constructor(private crudService: CRUDService) {
  }

  public getDashboardCards(): Observable<DashboardCard[]> {
    return this.crudService.getCollection<DashboardCard>(this.COLLECTION_NAME);
  }

  public createRandomCard(): Observable<string> {
    return this.crudService.createEntity<DashboardCard>(this.COLLECTION_NAME, {
      uuid: UuidUtil.generate(),
      name: RandomUtil.getRandomString(10),
      description: RandomUtil.getRandomString(200)
    });
  }

  public updateCardDescription(cardId: string): Observable<void> {
    return this.crudService.updateObject<DashboardCard>(this.COLLECTION_NAME, cardId, {
      description: RandomUtil.getRandomString(200)
    });
  }

  public removeCard(cardId: string): Observable<void> {
    return this.crudService.deleteObject(this.COLLECTION_NAME, cardId);
  }
}
