import { createSelector } from '@ngrx/store';
import { Book } from '../book/book.model';
import { Header } from '../table/table.component';
import { Sort } from '../util/sort';
import { AppState } from './app.state';

export const getBooksSelector = (state: AppState) => state.books;

export const getAllBooks = createSelector(getBooksSelector, (books: Book[]) => {
  debugger;
  return books;
});

export const sortBooks = (header: Header) =>
  createSelector(getBooksSelector, (books: Book[]) => {
    const sort = new Sort();
    const test = books.sort(
      sort.startSort(header.property, header.sort, header.type)
    );
    debugger;
    return test;
  });
