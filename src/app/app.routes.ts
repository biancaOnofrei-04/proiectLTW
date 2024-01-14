import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PersonalLibraryComponent } from './personal-library/personal-library.component';
import { MainLibraryComponent } from './main-library/main-library.component';
import { AddBooksComponent } from './add-books/add-books.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main-library', pathMatch: 'full' }, // Default route
    { path: 'personal-library', component: PersonalLibraryComponent, title:"Personal Library" },
    { path: 'main-library', component: MainLibraryComponent , title:"Main Library"},
    { path: 'add-books', component: AddBooksComponent, title: "Add A New Book" },
    { path: '**', redirectTo: '/main-library' }, //wildcard, redirect to main lib in case a url not found above is entered

  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}