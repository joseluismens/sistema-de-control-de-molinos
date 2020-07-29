import { Injectable } from '@angular/core';
import { Auth } from '../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string;

  constructor(private http:HttpClient,private router:Router) {
    this.url=Auth.url;
   }

   signup(user:any):Observable<any>{
      return this.http.post(this.url+'signup',user);
   }
   signin(user:any):Observable<any>{
    let params=JSON.stringify(user)
     return this.http.post(this.url+'signin',user);
   }
   loggedIn():Boolean{
    if(typeof(localStorage.getItem("auth-token"))=='undefined'){
      return true;
    }else{
      return false;
    }
        
    
   }
   getToken():String{
     return localStorage.getItem('token-auth');
   }
   logout():void{
     localStorage.removeItem('token-auth');
     this.router.navigate(['/signin']);
   }
   
}
