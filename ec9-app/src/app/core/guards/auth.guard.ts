import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {StoreService} from "../services/store.service";
import {map, take} from "rxjs/operators";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private storeService: StoreService) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.storeService.user$
      .pipe(
        take(1),
        map(user => {
          !user && this.router.navigate(["/home"]);
          return !!user;
        })
      );
  }
}
