import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Book } from '../book/models/book.model';
import { searchBookList } from '../book/store/books.actions';
import { GridSort } from '../gridsort/models/gridsort.model';
import { getGridSorts } from '../gridsort/store/gridsorts.selector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl();

  constructor(private store: Store<{ books: Book[]; gridSorts: GridSort[] }>) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((res) => this.getSearchData(res))
      )
      .subscribe((res) => {
        console.log('result', res);
      });
  }

  getSearchData(value: string) {
    this.store.pipe(select(getGridSorts)).subscribe((gs) => {
      debugger;
      this.store.dispatch(
        searchBookList({ searchString: value, gridSorts: gs })
      );
    });

    return of(value);
  }
}
