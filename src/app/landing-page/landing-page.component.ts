import { Component } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(public firebaseService: FirebaseService) { }
}
