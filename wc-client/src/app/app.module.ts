import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FileDisplayComponent } from './others/file-display/file-display.component';
import { FileDetailComponent } from './others/file-detail/file-detail.component';

import { routing } from './app.routes';
import { FileCreateComponent } from './others/file-create/file-create.component';
import { NavBarComponent } from './others/nav-bar/nav-bar.component';
import { FooterComponent } from './others/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDisplayComponent,
    FileDetailComponent,
    FileCreateComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
