import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService implements CanActivate {

  constructor(@Inject("auth") private auth, private router: Router) { }

  canActivate(): boolean {
    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/files']);
      return false;
    }
  }
}
