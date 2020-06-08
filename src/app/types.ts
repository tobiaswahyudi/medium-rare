import * as firebase from 'firebase/app';

export interface MWDocument {
  id: string;
  title: string;
  dateCreated: Date;
  dateModified: Date;
  contents: string;
}

export interface UserCollection {
  documents: firebase.firestore.CollectionReference;
}
