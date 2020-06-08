import { Component, OnInit } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    if (this.firebaseService.user === undefined) {
      window.location.href = '/';
    }
  }
}
