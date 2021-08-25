import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { Book } from '../book/models/book.model';
import { getBooks, sortBookList } from '../book/store/books.actions';
import { GridSort } from '../gridsort/models/gridsort.model';
import { updateHeaderSort } from '../gridsort/store/gridsorts.action';
import { Sort } from '../util/sort';
import { getAllBooks } from '../book/store/books.selector';
import { getGridSorts } from '../gridsort/store/gridsorts.selector';

export interface Header {
  text: string;
  property: string;
  type: string;
  sortIcon: string;
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
      property: 'volumeInfo.title',
      type: 'string',
      sortIcon: 'horizontal_rule',
    },
    {
      text: 'Author',
      property: 'volumeInfo.authors',
      type: 'string',
      sortIcon: 'horizontal_rule',
    },
    {
      text: 'Page Count',
      property: 'volumeInfo.pageCount',
      type: 'number',
      sortIcon: 'horizontal_rule',
    },
    {
      text: 'Publish Date',
      property: 'volumeInfo.publishedDate',
      type: 'Date',
      sortIcon: 'horizontal_rule',
    },
  ];

  constructor(private store: Store<{ books: Book[]; gridSorts: GridSort[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
    this.gridSorts$.subscribe((gridSorts) => {
      console.log(`current sort array`, gridSorts);
      this.store.dispatch(sortBookList({ gridSorts }));
    });
  }

  onSort(header: Header): void {
    this.store.dispatch(updateHeaderSort({ header }));
    const nextIcon = this.getNextSortIcon(header.sortIcon);
    const updatedHeaders = this.headers.map((h) => {
      if (h.property === header.property) {
        return {
          ...h,
          sortIcon: nextIcon,
        };
      }
      return h;
    });
    Object.assign(this.headers, updatedHeaders);
  }

  drop(event: any) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  }

  private getNextSortIcon(sort: string): string {
    switch (sort) {
      case 'horizontal_rule':
        return 'expand_less';
      case 'expand_less':
        return 'expand_more';
      case 'expand_more':
        return 'horizontal_rule';
    }
    return 'horizontal_rule';
  }
}
