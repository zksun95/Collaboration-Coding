import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(@Inject("auth") private auth) {
    this.auth.handleAuthentication();
  }

  ngOnInit() {
    if(this.auth.userProfile){
      console.log("have");
    }else{
      console.log("not");
    }
  }

  signIn(): void{
    this.auth.login();
    this.auth.getProfile((err, profile) => {
      //this.profile = profile;
      localStorage.setItem("profile", JSON.stringify(profile));
    });
  }

  signOut(): void{
    this.auth.logout(); 
  }

  isAuthed(): any{
    return this.auth.isAuthenticated();
  }
}
