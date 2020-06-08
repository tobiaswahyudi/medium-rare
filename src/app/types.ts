import * as firebase from "firebase/app";

export interface Document {
  id: string;
  title: string;
  dateCreated: Date;
  dateModified: Date;
  contents: string;
}

export interface UserCollection {
  documents: firebase.firestore.CollectionReference;
}
