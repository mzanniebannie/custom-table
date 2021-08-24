import { createSelector } from '@ngrx/store';
import { Book } from '../book/book.model';
import { AppState } from './app.state';

export const getBooksSelector = (state: AppState) => state.books;

export const getAllBooks = createSelector(getBooksSelector, (books: Book[]) => {
  return books;
});
