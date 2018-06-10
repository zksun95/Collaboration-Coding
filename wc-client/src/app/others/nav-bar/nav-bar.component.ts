import { Component, OnInit, Inject } from '@angular/core';
import { retry } from 'rxjs/operators';
import { VariableAst } from '@angular/compiler';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username = "";
  profile: any;
  
  constructor(@Inject("auth") private auth) {
    this.auth.handleAuthentication();
  }

  ngAfterContentChecked(){
    if(localStorage.getItem('profile')){
      this.username = JSON.parse(localStorage.getItem('profile')).nickname;
    } 
  }

  d = new Date();

  ngOnInit() {
    console.log(this.d.getTime());
    // if(this.auth.isAuthenticated()){
    //   this.updateProfile();
    // }
    // this.username = JSON.parse(localStorage.getItem('access_token')).nickname;
  }

  signIn(): void{
    console.log("test-signin");
    this.auth.login();
  }

  signOut(): void{
    this.auth.logout(); 
  }

  updateProfile(): any{
    console.log("try");
    this.auth.getProfile((err, profile) => {
      this.profile = profile;
      console.log(profile);
      localStorage.setItem("profile", JSON.stringify(profile));
      this.username = profile.nickname;
    });
  }
}
