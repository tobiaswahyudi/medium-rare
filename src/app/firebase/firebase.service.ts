import { Injectable } from '@angular/core';
import * as firebaseApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: firebase.app.App;
  firestore: firebase.firestore.Firestore;
  firestoreRef: firebase.firestore.CollectionReference;
  user: firebase.User | undefined;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAyn-nl8tGu5JSGiykCqY3fZaFPgcy5Zjc',
      authDomain: 'penciltest-777db.firebaseapp.com',
      databaseURL: 'https://penciltest-777db.firebaseio.com',
      projectId: 'penciltest-777db',
      storageBucket: 'penciltest-777db.appspot.com',
      messagingSenderId: '1089392676965',
      appId: '1:1089392676965:web:a40a5ba7fc511cf871f68c',
      measurementId: 'G-8WWCBJ5KJB'
    };
    // Initialize Firebase
    this.app = firebaseApp.initializeApp(firebaseConfig);
    this.firestore = this.app.firestore();
    this.firestoreRef = this.firestore.collection('users');

    firebaseApp.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  public login(): void {
    const provider = new firebaseApp.auth.GoogleAuthProvider();

    this.app.auth().signInWithPopup(provider)
    .then((result) => {
      this.user = result.user;
    })
    .catch(console.log);
  }

  public logout(): void {
    this.app.auth().signOut();
    this.user = undefined;
  }
}

export default FirebaseService;
