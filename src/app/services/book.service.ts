import { Injectable } from '@angular/core';
import { Book } from "../models/book";
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Movie} from "../models/movie";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'api/books';
  private nextId: number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.nextId = 65;
  }

  /** Get books from server. **/
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  /** POST: add a new book to the server */
  addBook(book: Book): Observable<Book> {
    book.id = this.nextId++;
    book.listened_to = false;
    book.read = false;

    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
