import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditorViewComponent } from './editor-view/editor-view.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'editor', component: EditorViewComponent },
  { path: 'editor/:documentId', component: EditorViewComponent },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
