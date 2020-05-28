import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book'
import { BookService } from "../services/book.service";

import { Sorter } from '../helpers/sorter';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books: Book[];
  sorter: Sorter;
  // Has function sort(listToSort, attribute)

  constructor(private  bookService: BookService) { }

  ngOnInit(): void {
    this.sorter = new Sorter();
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.books = books;
      });
  }

  sortBy(feature): void {
    // Sorts books object.
    // feature: the key desired to sort by.

    this.books = this.sorter.sort(this.books, feature)
  }
}




