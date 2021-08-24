import { Action, createReducer, on } from '@ngrx/store';
import { Book } from '../book/book.model';
import { Sort } from '../util/sort';

import { retrievedBookList, sortBookList } from './books.actions';

export const initialState: ReadonlyArray<Book> = [];

const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => {
    return [...books];
  }),
  on(sortBookList, (state, { gridSorts }) => {
    const sort = new Sort();
    return state.slice();
    // .sort(sort.startSort(header.property, header.sort, header.type));
  })
);

export function reducer(state: any, action: Action) {
  return booksReducer(state, action);
}
