import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 10, title: 'The Losers' },
      { id: 12, title: 'My Neighbor Totoro' },
      { id: 13, title: 'The Incredibles' },
      { id: 14, title: 'The Incredibles 2' },
      { id: 15, title: "Kiki's Delivery Service" },
    ];
    return {movies};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the movie array is empty,
  // the method below returns the initial number (11).
  // if the movie array is not empty, the method below returns the highest
  // movie id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(hero => hero.id)) + 1 : 11;
  }
}
