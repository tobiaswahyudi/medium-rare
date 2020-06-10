import { Component, OnInit, AfterViewInit } from '@angular/core';
import FirebaseService from '../firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MWDocument } from '../types';
import { FirestoreService } from '../firebase/firestore.service';
import { first } from 'rxjs/operators';
import MediumEditor from '../../medium-editor/js/medium-editor';

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit, AfterViewInit {

  id: string;
  doc: MWDocument;
  timeoutHold: number | null;
  editor: any;

  constructor(
    public firebaseService: FirebaseService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.handleChange = this.handleChange.bind(this);

    // Should probably protect from router rather than the components.
    // Auth takes an extra event loop (?) so it would be useless either way
    // TODO: Find actual way to do route protection
    if (this.firebaseService.user === undefined) {
      this.router.navigateByUrl('/');
    }

    this.editor = null;
    this.timeoutHold = null;

    this.doc = {
      title: '',
      dateCreated: new Date().getTime(),
      dateModified: new Date().getTime(),
      contents: ''
    };

    this.route.paramMap.subscribe(params => {
      this.id = params.get('documentId');
      this.firestoreService.getDoc(params.get('documentId'))
        .pipe(first())
        .subscribe(doc => {
          this.doc = doc;
          this.syncEditable();
        });
    });
  }

  ngAfterViewInit(): void {
    if (!this.editor) {
      this.editor = new MediumEditor('#editable', { placeholder: false });
    }
  }

  syncEditable(): void {
    const editable = document.getElementById('editable');
    if (editable) {
      editable.innerHTML = this.doc.contents;
      editable.removeEventListener('input', this.handleChange);
      editable.addEventListener('input', this.handleChange);
    }
  }

  delete(): void {
    this.firestoreService.deleteDoc(this.id);
    this.router.navigateByUrl('/dashboard');
  }

  handleChange(): void {
    if (this.timeoutHold) {
      window.clearTimeout(this.timeoutHold);
    }
    this.timeoutHold = window.setTimeout(() => {
      this.doc.contents = document.getElementById('editable').innerHTML;
      this.doc.dateModified = new Date().getTime();
      this.firestoreService.updateDoc(this.id, this.doc);
      this.timeoutHold = null;
    }, 300);
  }
}
