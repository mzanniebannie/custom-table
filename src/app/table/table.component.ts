import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Book } from '../book/book.model';
import { getBooks } from '../store/books.actions';
import { getAllBooks, sortBooks } from '../store/books.selector';
import { Sort } from '../util/sort';

export interface Header {
  text: string;
  sort: string;
  property: string;
  type: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  sort = new Sort();
  books$ = this.store.pipe(select(getAllBooks));
  headers: Header[] = [
    {
      text: 'Title',
      sort: 'none',
      property: 'volumeInfo.title',
      type: 'string',
    },
    {
      text: 'Author',
      sort: 'none',
      property: 'volumeInfo.authors',
      type: 'string',
    },
    {
      text: 'Page Count',
      sort: 'none',
      property: 'volumeInfo.pageCount',
      type: 'number',
    },
    {
      text: 'Publish Date',
      sort: 'none',
      property: 'volumeInfo.publishedDate',
      type: 'Date',
    },
  ];

  constructor(private store: Store<{ books: Book[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
  }

  onSort(header: Header): void {
    debugger;
  }

  drop(event: any) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  }
}
