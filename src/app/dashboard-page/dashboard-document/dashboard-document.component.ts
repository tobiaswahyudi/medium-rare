import { Component, OnInit, Input } from '@angular/core';
import { MWDocument } from 'src/app/types';

@Component({
  selector: 'app-dashboard-document',
  templateUrl: './dashboard-document.component.html',
  styleUrls: ['./dashboard-document.component.scss']
})

export class DashboardDocumentComponent implements OnInit {

  @Input() doc: MWDocument;

  dateString: string;

  constructor() { }

  ngOnInit(): void {
    this.dateString = new Date(this.doc.dateModified).toLocaleString('en-CA', {
      hour12: false,
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
  });
  }

}
