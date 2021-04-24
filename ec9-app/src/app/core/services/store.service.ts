import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";
import firebase from "firebase";
import User = firebase.User;

@Injectable()
export class StoreService {

  public user$: ReplaySubject<User> = new ReplaySubject<User>(1);
  private _user: User;

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    if (!this._user || this._user.uid !== user.uid) {
      this._user = user;
      this.user$.next(user);
    }
  }
}
