import { Component, OnInit } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';
import { FirestoreService } from '../firebase/firestore.service';
import { redirectToHome } from '../utils';
import { MWDocument } from '../types';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(public firebaseService: FirebaseService, public firestoreService: FirestoreService) {}

  docs: MWDocument[];

  ngOnInit(): void {
    // Should probably protect from router rather than the components.
    // Auth takes an extra event loop (?) so it would be useless either way
    // TODO: Find actual way to do route protection
    if (this.firebaseService.user === undefined) {
      redirectToHome();
    }
    this.firestoreService.updateDocs().subscribe(docs => {
      this.docs = docs;
    });
    this.firestoreService.createOnFirstTime();
  }
}
