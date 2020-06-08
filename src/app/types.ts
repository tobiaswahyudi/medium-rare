import * as firebase from 'firebase/app';

export interface MWDocument {
  title: string;
  dateCreated: Date;
  dateModified: Date;
  contents: string;
}

export interface UserCollection {
  documents: firebase.firestore.CollectionReference;
}
