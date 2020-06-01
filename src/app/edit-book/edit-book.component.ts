import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { Book } from "../models/book";
import {BookService} from "../services/book.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe( book => {
        this.book = book;
      })
  }

  addAuthor(a): void {
    this.book.author = a;
  }
  toggleRead(r): void {
    this.book.read = !r;
  }
  toggleListened(l): void {
    this.book.listened_to = !l;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.bookService.deleteBook(this.book)
      .subscribe(() =>this.goBack());
  }
}
