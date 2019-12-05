import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: any;
  constructor(private angularFire:AngularFireDatabase){
      this.angularFire.list('/logs').valueChanges().subscribe(res=>{
        console.log(res);
        
        this.items=res;
        
      })
      
      
  }
      
  
}
