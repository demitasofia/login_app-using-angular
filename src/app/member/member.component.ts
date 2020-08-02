import { Component, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent  {

  constructor(public auth: AngularFireAuth) {
  }
  
  logout() {
    this.auth.signOut();
  }
 
  

}
