import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { Book } from '../models/book.model';
import {
  retrievedBookList,
  searchBookList,
  sortBookList,
} from './books.actions';
import { Sort } from 'src/app/util/sort';

export let initialState: Book[] = [];

const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => {
    initialState = books;
    return [...books];
  }),
  on(sortBookList, (state, { gridSorts }) => {
    const sort = new Sort();
    let stateClone = cloneDeep(initialState);
    gridSorts.forEach((s) => {
      stateClone = stateClone.sort(sort.startSort(s.key, s.sort, s.type));
    });

    return stateClone;
  }),
  on(searchBookList, (state, { searchString }) => {
    debugger;
    searchString = searchString.toLowerCase();
    let stateClone = cloneDeep(initialState);
    const test = stateClone.filter(
      (items) =>
        items.volumeInfo.authors.join().toLowerCase().includes(searchString) ||
        items.volumeInfo.pageCount === parseInt(searchString) ||
        items.volumeInfo.title?.toLowerCase().includes(searchString)
    );
    return test;
  })
);

export function reducer(state: any, action: Action) {
  return booksReducer(state, action);
}
