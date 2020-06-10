import { Component, OnInit } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';
import { FirestoreService } from '../firebase/firestore.service';
import { MWDocument } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  search: string;
  filtered: MWDocument[];

  constructor(
    public firebaseService: FirebaseService,
    public firestoreService: FirestoreService,
    private router: Router
  ) {
    this.search = '';
  }

  ngOnInit(): void {
    // Should probably protect from router rather than the components.
    // Auth takes an extra event loop (?) so it would be useless either way
    // TODO: Find actual way to do route protection
    if (this.firebaseService.user === undefined) {
      this.router.navigateByUrl('/');
    }
    this.firestoreService.createOnFirstTime();
  }
}
