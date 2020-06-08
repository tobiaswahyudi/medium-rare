import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';
import { UserCollection, MWDocument } from '../types';
import { Observable } from 'rxjs';
import { docData, collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  documents: MWDocument[];

  constructor(private firebaseService: FirebaseService) { }

  public getUser(): Observable<UserCollection> {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }
    return docData(this.firebaseService.firestoreRef.doc(user.uid));
  }

  public updateDocs(): void {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }
    collectionData(this.firebaseService.firestoreRef.doc(user.uid).collection('documents'))
    .subscribe(console.log);
  }

  public createDoc(file: MWDocument): void {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }

    this.firebaseService.firestoreRef.doc(user.uid).collection('documents').add(file);
  }

  public createOnFirstTime(): void {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }
    this.firebaseService.firestoreRef.doc(user.uid).get().then(snapshot => {
      console.log(snapshot);
      if (!snapshot.exists) {
        this.firebaseService.firestoreRef.doc(user.uid).set({
          displayName: user.displayName
        });
        this.createDoc({
          title: 'Sample Document',
          dateCreated: new Date(),
          dateModified: new Date(),
          contents: ''
        });
      }
    });
  }
}
