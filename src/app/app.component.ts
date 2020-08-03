import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent implements OnInit {
  email:string;
  password:string;
  returnedArray = [];
  loggedUser: string;
  $user: Observable<User>
  userEmail: string;


  constructor(public auth: AngularFireAuth,
    private afs: AngularFirestore
    ){this.$user = this.auth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );}
         
     
  
  async login() {
     const credentials = await this.auth.signInWithPopup(new auth.FacebookAuthProvider())
     console.log(credentials.user.email);
    this.userEmail = credentials.user.email;
    console.log('User Email :' + this.userEmail);  
  }
  async logout() {
    await this.auth.signOut();
    
    //  login panna hello kela logout
    }

 signup(){
   this.auth.createUserWithEmailAndPassword(this.email,this.password)
   .then((userCredentials) => console.log(userCredentials));
   
 }
 ngOnInit(){
  this.db.collection('users').snapshotChanges().subscribe(
    serviceItems => {
      this.returnedArray = [];
      serviceItems.forEach(a=>{
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.returnedArray.push(item);
      })
    }
  )

  this.loggedUser = this.auth.userEmail;
}

getUserEmail(){
  return this.userEmail;
}

getCurrentUser() {
  console.log(this.auth.getUserEmail());
  
}

/* var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });*/
}

export interface User {
  uid: string;
  email: string;
}






  
  
    
 


