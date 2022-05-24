import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HealthComponent } from './components/health/health.component';

import { IPFSService } from './services/ipfs/ipfs.service';
import { OrbitDBService } from './services/orbitdb/orbit-db.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HealthComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    IPFSService,
    OrbitDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
