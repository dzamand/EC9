import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Injectable} from "@angular/core";
import {Observable, from, of} from "rxjs";
import {StoreService} from "./store.service";
import {switchMap, take, tap} from "rxjs/operators";
import firebase from "firebase";
import auth = firebase.auth;
import User = firebase.User;
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {fromPromise} from "rxjs/internal-compatibility";

@UntilDestroy()
@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private storeService: StoreService) {
  }

  public initService(): void {
    this.afAuth.authState
      .pipe(
        tap((user: firebase.User) => this.storeService.user = user),
        switchMap((user: firebase.User) => user ? this.afs.doc<firebase.User>(`users/${user.uid}`).valueChanges() : of(null)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public googleSign(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider))
      .pipe(
        tap((userCred: auth.UserCredential) => this.updateUserData(userCred.user)),
        take(1)
      );
  }

  private updateUserData(user: User): Observable<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return fromPromise(userRef.set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    } as User, {
      merge: true
    }));
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(take(1));
  }
}
