import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { Book } from '../models/book.model';
import { retrievedBookList, sortBookList } from './books.actions';
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
  })
);

export function reducer(state: any, action: Action) {
  return booksReducer(state, action);
}
