import { Component, OnInit } from "@angular/core";
import FirebaseService from "../firebase/firebase.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {

  user: firebase.User | undefined;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebaseService.user;
  }
}