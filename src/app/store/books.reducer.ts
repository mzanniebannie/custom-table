import { Action, createReducer, on } from '@ngrx/store';
import { Book } from '../book/book.model';

import { retrievedBookList } from './books.actions';

export const initialState: ReadonlyArray<Book> = [];

const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => {
    return [...books];
  })
);

export function reducer(state: any, action: Action) {
  return booksReducer(state, action);
}
