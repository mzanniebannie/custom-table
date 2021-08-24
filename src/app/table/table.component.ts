import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';

import { Book } from '../book/book.model';
import { getBooks, sortBookList } from '../store/books.actions';
import { getAllBooks } from '../store/books.selector';
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
      sort: 'desc',
      property: 'volumeInfo.title',
      type: 'string',
    },
    {
      text: 'Author',
      sort: 'desc',
      property: 'volumeInfo.authors',
      type: 'string',
    },
    {
      text: 'Page Count',
      sort: 'desc',
      property: 'volumeInfo.pageCount',
      type: 'number',
    },
    {
      text: 'Publish Date',
      sort: 'desc',
      property: 'volumeInfo.publishedDate',
      type: 'Date',
    },
  ];

  constructor(private store: Store<{ books: Book[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
  }

  onSort(header: Header): void {
    this.store.dispatch(sortBookList({ header }));
    const test = this.headers.map(function (a) {
      return a.property === header.property
        ? { ...header, sort: header.sort === 'desc' ? 'asc' : 'desc' }
        : a;
    });
    this.headers = test;
    debugger;
  }

  drop(event: any) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  }
}
