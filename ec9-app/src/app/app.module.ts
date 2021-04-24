import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuardService} from "./core/guards/auth.guard";
import {AuthService} from "./core/services/auth.service";
import {BrowserModule} from "@angular/platform-browser";
import {CRUDService} from "./core/services/crud.service";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from "./not-found/not-found.component";
import {StoreService} from "./core/services/store.service";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    StoreService,
    AuthGuardService,
    CRUDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
