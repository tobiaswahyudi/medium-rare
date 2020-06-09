import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';
import { MWDocument } from '../types';
import { Observable } from 'rxjs';
import { docData, collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  docs: MWDocument[];

  constructor(private firebaseService: FirebaseService) { }

  public updateDocs(): void {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }
    collectionData<MWDocument>(this.firebaseService.firestoreRef.doc(user.uid).collection('documents'))
      .subscribe(docs => this.docs = docs);
  }

  public getDoc(id: string): Observable<MWDocument> {
    const user = this.firebaseService.user;
    return docData(this.firebaseService.firestoreRef.doc(user.uid).collection('documents').doc(id));
  }

  public createDoc(file: MWDocument): string {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }

    const docRef = this.firebaseService.firestoreRef.doc(user.uid).collection('documents').doc();

    docRef.set({ id: docRef.id, ...file });
    this.updateDocs();

    return docRef.id;
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
          dateCreated: new Date().getTime(),
          dateModified: new Date().getTime(),
          contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ised do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        });
      }
    });
  }

  public createBlankDocument(): string {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }
    return this.createDoc({
      title: 'Untitled Document',
      dateCreated: new Date().getTime(),
      dateModified: new Date().getTime(),
      contents: ''
    });
  }
}
