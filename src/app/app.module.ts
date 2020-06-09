import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { DashboardDocumentComponent } from './dashboard-page/dashboard-document/dashboard-document.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginButtonComponent,
    DashboardPageComponent,
    LeftNavComponent,
    EditorViewComponent,
    DashboardDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
