import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { MOVIES } from '../mock-movies'

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Observable<Movie[]> {
    return of(MOVIES);
  }
}
