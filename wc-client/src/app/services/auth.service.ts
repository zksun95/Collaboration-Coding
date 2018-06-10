import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { resolve } from 'url';
import { reject } from 'q';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'O228e5ilo3JZXHQKSfYRmi6VvwQXCsC9',
    domain: 'zksun.auth0.com',
    responseType: 'token id_token',
    audience: 'https://zksun.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile'
  });

  userProfile: any;

  constructor(public router: Router) {}

  public login() {
      return new Promise((resolve, reject)=>{
        this.auth0.authorize(()=>{
          console.log("1");
          //this.handleAuthentication();
          this.getProfile((err, profile) => {
            console.log("2");
            localStorage.setItem("profile", JSON.stringify(profile));
            resolve();
          });
        });
      });
      
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile((err, profile) => {
      localStorage.setItem("profile", JSON.stringify(profile));
      //this.username = profile.nickname;
      //console.log(this.logged);
      //console.log(this.username);
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    console.log("try out");
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    //this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}