import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book'
import { BookService } from "../services/book.service";

import { Sorter } from '../helpers/sorter';

import { Router } from '@angular/router';
import {subscribeOn} from "rxjs/operators";

interface bookDisplayOption {
  value: string;
  viewValue: string;
}
interface sortButton {
  name: string;
  keyVal: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: Book[];
  sorter: Sorter;  // Has function sort(listToSort, attribute)
  showing: string;
  showTypeList: bookDisplayOption[];
  sortByButtons: sortButton[];

  constructor(
    private  bookService: BookService,
    private router: Router) {
    this.showing = 'all'; // Start by displaying all books
    this.showTypeList = [
      {value: 'all', viewValue: 'All'},
      {value: 'completed', viewValue: 'Only completed ones'},
      {value: 'uncompleted', viewValue: 'Only uncompleted ones'}
    ];

    this.sortByButtons = [
      {name:'title', keyVal:'title'},
      {name:'author', keyVal:'author'},
      {name:'read', keyVal:'read'},
      {name:'listened to', keyVal:'listened_to'},
    ]
  }

  getActiveSort(){
    return this.sorter.getActiveSort();
  }

  changeClient(event) {
    this.showing = event;
  }

  ngOnInit(): void {
    this.sorter = new Sorter();
    this.getBooks();
  }
  // API
  getBooks(): void {
    /**
     * Get the book list from book service
     * */
    this.bookService.getBooks()
      .subscribe(books => {
        this.books = books;
      });
  }

  addBook(title): void {
    // Add the book to the backend.
    title = title.trim();
    let newId = null;
    if (!title) { return; }
    this.bookService.addBook({ title } as Book)
      .subscribe( newBook => {
        this.books.push(newBook);
        newId = newBook.id;
        if (newId) { return; }
      },
        () => { return; },
        () => {
          // Navigate to edit book page.
          this.router.navigate(['/books/edit/' + newId]);
      });
  }

  // Sorting and filtering
  getFilteredBooks() {
    if (!this.books){ return []; }
    return this.books.filter(b => {
      let completed = (b.read || b.listened_to);
      return (this.showing === 'all' ||
        (this.showing === 'completed' && completed) ||
        (this.showing === 'uncompleted' && !completed));
    });
  }

  sortBy(feature): void {
    // Sorts books object.
    // feature: the key desired to sort by.
    this.books = this.sorter.sort(this.books, feature)
  }
}




