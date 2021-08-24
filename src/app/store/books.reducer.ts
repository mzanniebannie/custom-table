import { Action, createReducer, on } from '@ngrx/store';
import { Book } from '../book/book.model';
import { Sort } from '../util/sort';
import { cloneDeep } from 'lodash';

import { retrievedBookList, sortBookList } from './books.actions';

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
  })
);

export function reducer(state: any, action: Action) {
  return booksReducer(state, action);
}
