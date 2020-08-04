import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
//import {AngularFirestoreDocument} from '@angular/fire/firestore';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent implements OnInit {

  //loginForm: FormGroup;
  //errorMessage: string = '';

  email:string;
  password:string;
  returnedArray = [];
  loggedUser: string;
  $user: Observable<User>
  userEmail: string;
  //public : AngularFirestoreDocument<User>;

  constructor(public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFirestore,
   // private fb: FormBuilder,
    //private router: Router,
    ){this.$user = this.auth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                } 
        else {
          return of(null);
             }
                        }));
                       // this.createForm();
  
  }

  /*createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }
 
  
  tryLogin(value){
    this.auth.doLogin(value)
    .then(res => {
      this.router.navigate(['/member']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}*/





  signin() {
       this.auth.signInWithPopup(new auth.GoogleAuthProvider())
     
   }
   // signout() {
     //this.auth.signOut();
     
     //}  
     
  
  async login() {
     const credentials = await this.auth.signInWithPopup(new auth.FacebookAuthProvider())
     console.log(credentials.user.email);
    this.userEmail = credentials.user.email;
    console.log('User Email :' + this.userEmail);  
  }
  async logout() {
    await this.auth.signOut();
    
    
    }

 signup(){
   this.auth.createUserWithEmailAndPassword(this.email,this.password)
   .then((userCredentials) => console.log(userCredentials));
   
 }
 ngOnInit(){
  this.db.collection('user').snapshotChanges().subscribe(
    serviceItems => {
      this.returnedArray = [];
      serviceItems.forEach(a=>{
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.returnedArray.push(item);
      })
    }
  )

  this.loggedUser = this.userEmail;
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


