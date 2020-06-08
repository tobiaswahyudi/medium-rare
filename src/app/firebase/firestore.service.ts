import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';
import { UserCollection } from '../types';
import { Observable } from 'rxjs';
import { docData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firebaseService: FirebaseService) { }

  public getUser(): Observable<UserCollection> {
    const user = this.firebaseService.user;
    if (!user) {
      throw new Error('User must be logged in.');
    }
    return docData(this.firebaseService.firestoreRef.doc(user.uid));
  }
}
