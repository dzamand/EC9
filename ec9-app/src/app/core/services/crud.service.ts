import {AngularFirestore} from "@angular/fire/firestore";
import {Injectable} from "@angular/core";
import {Observable, from} from "rxjs";
import {map, take} from "rxjs/operators";
import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;

enum SortTypes {
  ASC = "asc",
  DESC = "desc"
}

@Injectable()
export class CRUDService {
  constructor(private firestoreService: AngularFirestore) {
  }

  public createEntity<T>(collectionName: string, data: T): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data))
      .pipe(
        map((value: DocumentReference) => value.id),
        take(1)
      );
  }

  public getCollection<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(map((actions) => this.processActions(actions)));
  }

  public getCollectionWithOrder<T>(collectionName: string, orderField: string, orderAsc: boolean = true): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, ref => ref.orderBy(orderField, orderAsc ? SortTypes.ASC : SortTypes.DESC))
      .snapshotChanges()
      .pipe(map((actions) => this.processActions(actions)));
  }

  private processActions<T>(actions): T[] {
    return actions.map((a) => {
      const data: any = a.payload.doc.data();
      const {id} = a.payload.doc;
      return {
        id,
        ...data
      } as T;
    });
  }

  public getElementsByArray<T>(collectionName: string, property: string, value: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, ref => ref.where(property, "array-contains", value))
      .snapshotChanges()
      .pipe(map((actions) => this.processActions(actions)));
  }

  public getElementById<T>(collectionName: string, ID: string): Observable<T> {
    return from(
      this.firestoreService.collection(collectionName)
        .doc(ID)
        .get()
    )
      .pipe(map((value) => value.data() as T));
  }

  public updateObject<T>(collectionName: string, id: string, obj: Partial<T>): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .update(obj)
    );
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(
      this.firestoreService.collection(collectionName)
        .doc(id)
        .delete()
    ).pipe(take(1));
  }
}
