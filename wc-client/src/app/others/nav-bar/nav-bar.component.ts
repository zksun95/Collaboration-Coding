import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username = "";
  logged = false;

  constructor(@Inject("auth") private auth) {
    this.auth.handleAuthentication();
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      console.log("in");
      //this.logged = true;
      this.auth.getProfile((err, profile) => {
        //this.profile = profile;
        localStorage.setItem("profile", JSON.stringify(profile));
        this.username = profile.nickname;
      });
    }else{
      //this.logged = false;
      console.log("out");
    }
  }

  signIn(): void{
    this.auth.login().then(()=>{
      this.logged = true;
      this.auth.getProfile((err, profile) => {
        //this.profile = profile;
        localStorage.setItem("profile", JSON.stringify(profile));
        this.username = profile.nickname;
      });
    });
  }

  signOut(): void{
    this.auth.logout(); 
  }

  isAuthed(): any{
    return this.auth.isAuthenticated();
  }
}
