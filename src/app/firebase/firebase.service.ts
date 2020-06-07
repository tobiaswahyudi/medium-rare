import { Injectable } from "@angular/core";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  // Service fields
  app: firebase.app.App;
  analytics: firebase.analytics.Analytics;
  firestore: firebase.firestore.Firestore;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAyn-nl8tGu5JSGiykCqY3fZaFPgcy5Zjc",
      authDomain: "penciltest-777db.firebaseapp.com",
      databaseURL: "https://penciltest-777db.firebaseio.com",
      projectId: "penciltest-777db",
      storageBucket: "penciltest-777db.appspot.com",
      messagingSenderId: "1089392676965",
      appId: "1:1089392676965:web:a40a5ba7fc511cf871f68c",
      measurementId: "G-8WWCBJ5KJB"
    };
    // Initialize Firebase
    this.app = firebase.initializeApp(firebaseConfig);
    this.analytics = firebase.analytics(this.app);
    this.firestore = firebase.firestore(this.app);
  }
}

export default FirebaseService;
