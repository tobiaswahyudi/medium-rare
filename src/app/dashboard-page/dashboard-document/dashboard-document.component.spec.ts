import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocumentComponent } from './dashboard-document.component';

describe('DashboardDocumentComponent', () => {
  let component: DashboardDocumentComponent;
  let fixture: ComponentFixture<DashboardDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
