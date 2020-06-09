import { Component, OnInit } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MWDocument } from '../types';
import { FirestoreService } from '../firebase/firestore.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit {

  id: string;
  doc: MWDocument;

  constructor(
    public firebaseService: FirebaseService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Should probably protect from router rather than the components.
    // Auth takes an extra event loop (?) so it would be useless either way
    // TODO: Find actual way to do route protection
    if (this.firebaseService.user === undefined) {
      this.router.navigateByUrl('/');
    }

    this.doc = {
      title: '',
      dateCreated: new Date().getTime(),
      dateModified: new Date().getTime(),
      contents: ''
    };

    this.route.paramMap.subscribe(params => {
      this.id = params.get('documentId');
      console.log(params.get('documentId'));
      this.firestoreService.getDoc(params.get('documentId'))
        .pipe(first())
        .subscribe(doc => this.doc = doc);
    });
  }

  delete(): void {
    this.firestoreService.deleteDoc(this.id);
    this.router.navigateByUrl('/dashboard');
  }
}
