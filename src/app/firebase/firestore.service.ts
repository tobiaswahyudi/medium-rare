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
}
