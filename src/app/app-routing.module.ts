import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent} from "./movies/movies.component";
import { MovieInfoComponent} from "./movie-info/movie-info.component";
import {BooksComponent} from "./books/books.component";


const routes: Routes = [
  { path:'', redirectTo: '/movies', pathMatch:'full' },
  { path:'detail/:id', component: MovieInfoComponent },
  { path:'movies', component: MoviesComponent },
  { path:'books', component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
