import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent} from "./movies/movies.component";
import { MovieInfoComponent} from "./movie-info/movie-info.component";
import {BooksComponent} from "./books/books.component";
import {EditBookComponent} from "./edit-book/edit-book.component";


const routes: Routes = [
  { path:'', redirectTo: '/books', pathMatch:'full' },
  { path:'detail/:id', component: MovieInfoComponent },
  { path:'movies', component: MoviesComponent },
  { path:'books', component: BooksComponent },
  { path:'books/edit/:id', component: EditBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
