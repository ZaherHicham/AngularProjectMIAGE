import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  urlConnexion = "http://localhost:8010/api/connexion";
  urlInscription = "http://localhost:8010/api/inscription";
  loggedIn = false;
  isUserAdmin = false;
  username: string;

  // logIn(){
  //   this.loggedIn = true;
  // }
  logIn(pseudo:any, motDePasse:any): Observable<any>{
    return this.http.post(this.urlConnexion, {pseudo: pseudo, motDePasse: motDePasse}).pipe(
      tap((res:any)=>{
        if(res){
          localStorage.setItem('token', res.token);
          this.loggedIn = true;
          this.username = res.pseudo;
        }
      }
    ));
  }

  signUp(pseudo:any, motDePasse:any, isAdmin:any): Observable<any>{
    console.log("pseudo: " + pseudo + " motDePasse: " + motDePasse + " isAdmin: " + isAdmin);
    return this.http.post(this.urlInscription, {pseudo: pseudo, motDePasse: motDePasse, isAdmin: isAdmin});
  }

  logOut(){
    this.loggedIn = false;
    localStorage.removeItem('token');
    this.username = '';
  }
  getToken(){
    return localStorage.getItem('token');
  }

  getLoggedIn(){
    return this.loggedIn;
  }
}
