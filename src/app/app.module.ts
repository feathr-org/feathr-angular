import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FileComponent } from './components/file/file.component';

import { IPFSService } from './services/ipfs/ipfs.service';
import { OrbitDBService } from './services/orbitdb/orbit-db.service';
import { FileLinkService } from './services/file-link/file-link.service';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileComponent,
    NavComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    IPFSService,
    OrbitDBService,
    FileLinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
