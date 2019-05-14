import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule 
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
