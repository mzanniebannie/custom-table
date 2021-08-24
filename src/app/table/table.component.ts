import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { cloneDeep, merge } from 'lodash';

import { Book } from '../book/book.model';
import { getBooks, sortBookList } from '../store/books.actions';
import { getAllBooks } from '../store/books.selector';
import { Sort } from '../util/sort';
import { GridSort } from '../gridsort/gridsort.model';
import { getGridSorts } from '../store/gridsorts.selector';
import { map } from 'rxjs/operators';
import { addSort, removeSort } from '../store/gridsorts.action';

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
  gridSorts$ = this.store.pipe(select(getGridSorts));
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

  constructor(private store: Store<{ books: Book[]; gridSorts: GridSort[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
    this.gridSorts$.subscribe((value) => {
      console.log(value);
    });
  }

  onSort(header: Header): void {
    this.store.dispatch(addSort({ header }));

    // this.store.dispatch(sortBookList({ this.gridsorts$ }));
    debugger;
  }

  drop(event: any) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  }
}
