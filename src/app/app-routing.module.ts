import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FileComponent } from './components/file/file.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'file/:id', component: FileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
