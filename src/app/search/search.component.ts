import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Book } from '../book/models/book.model';
import { searchBookList } from '../book/store/books.actions';
import { GridSort } from '../gridsort/models/gridsort.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl();
  result: string = '';

  constructor(private store: Store<{ books: Book[]; gridSorts: GridSort[] }>) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        // debounce input for 400 milliseconds
        debounceTime(400),
        // only emit if emission is different from previous emission
        distinctUntilChanged(),
        // switch map api call. This will cause previous api call to be ignored if it is still running when new emission comes along
        switchMap((res) => this.getSearchData(res))
      )
      .subscribe((res) => {
        console.log('result', res);
        this.result = res;
      });
  }

  // dummy api request. just returns same value passed in
  getSearchData(value: string) {
    this.store.dispatch(searchBookList({ searchString: value }));
    return of(value);
  }
}
