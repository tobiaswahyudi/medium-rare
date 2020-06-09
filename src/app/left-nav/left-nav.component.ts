import { Component, OnInit } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';
import { FirestoreService } from '../firebase/firestore.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.firestoreService.updateDocs();
  }

}
