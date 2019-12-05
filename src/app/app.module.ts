import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule,AngularFireList } from '@angular/fire/database';

import { ChartsModule } from 'ng2-charts';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { LogarithmicComponent } from './components/logarithmic/logarithmic.component';



@NgModule({
  declarations: [
    AppComponent,
    LineGraphComponent,
    LogarithmicComponent
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
