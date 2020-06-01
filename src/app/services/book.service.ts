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

  /** GET books from server. **/
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  /** GET specific book from server */
  getBook(id): Observable<Book>{
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        catchError(this.handleError<Book>('getBook'))
      );
  }

  /** PUT: update book on the server*/
  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBook'))
    );
  }


  /** POST: add a new book to the server */
  addBook(book: Book): Observable<Book> {
    book.id = this.nextId++;
    book.author = '';
    book.listened_to = false;
    book.read = false;

    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }
  /** DELETE a book from the server. */
  deleteBook(book: Book | number): Observable<any> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>('deleteBook'))
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
