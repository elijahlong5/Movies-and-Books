import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MOVIES } from '../mock-movies';

import { MovieService} from "../services/movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  selectedMovie: Movie;




  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(m => {
        this.movies = m;
      });
  }


}
