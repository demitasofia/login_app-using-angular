import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MemberComponent } from './member/member.component';
//import {AngularFirestoreDocument} from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { Router} from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AppRoutingModule,
    Router,
    
    //AngularFirestoreDocument
    
  ],
  declarations: [ AppComponent, MemberComponent,  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
