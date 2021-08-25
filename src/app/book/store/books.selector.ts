import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Book } from '../models/book.model';

export const getBooksSelector = (state: AppState) => state.books;

export const getAllBooks = createSelector(getBooksSelector, (books: Book[]) => {
  return books;
});
