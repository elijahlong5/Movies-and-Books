import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './models/movie';
import { Book } from './models/book';

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

    const books = [
      { id: 20, title:'Name of the Wind', author:'Patrick Rothfuss', read:true, listened_to:true },
      { id: 21, title:"The Wise Man's Fear", author:'Patrick Rothfuss', read:false, listened_to:true },
      { id: 22, title:"The Slow Regard of Silent Things", author:'Patrick Rothfuss', read:true, listened_to:false },
      { id: 23, title:"Talking to Strangers", author:'Malcolm Gladwell', read: false, listened_to:true },
      { id: 24, title:"The Inner Game of Tennis", author:'', read:true, listened_to:true },
      { id: 25, title:"Blink", author:'Malcolm Gladwell', read:false, listened_to:true },
      { id: 26, title:"Educated", author:'Tara Westover', read:false, listened_to:true },
      { id: 27, title:"Origin", author:'Dan Brown', read:true, listened_to:false },
    ]
    return { movies, books };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the movie array is empty,
  // the method below returns the initial number (11).
  // if the movie array is not empty, the method below returns the highest
  // movie id + 1.
  genId<T extends Movie | Book >(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
