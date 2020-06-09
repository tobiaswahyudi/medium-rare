import * as firebase from 'firebase/app';

export type Time = number;
export interface MWDocument {
  id?: string;
  title: string;
  dateCreated: Time;
  dateModified: Time;
  contents: string;
}

export interface UserCollection {
  documents: firebase.firestore.CollectionReference;
}
