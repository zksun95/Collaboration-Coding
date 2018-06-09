import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileDisplayComponent } from './others/file-display/file-display.component';
import { FileDetailComponent } from './others/file-detail/file-detail.component';

import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';

import { routing } from './app.routes';
import { FileCreateComponent } from './others/file-create/file-create.component';
import { NavBarComponent } from './others/nav-bar/nav-bar.component';
import { FooterComponent } from './others/footer/footer.component';
import { ProfileInComponent } from './others/nav-bar/profile-in/profile-in.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDisplayComponent,
    FileDetailComponent,
    FileCreateComponent,
    NavBarComponent,
    FooterComponent,
    ProfileInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    HttpClientModule
  ],
  providers: [
    {
      provide: "filesInfo",
      useClass: FilesService
    },
    {
      provide: "auth",
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
