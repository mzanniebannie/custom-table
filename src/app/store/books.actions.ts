import { createAction, props } from '@ngrx/store';
import { Book } from '../book/book.model';
import { Header } from '../table/table.component';

export const retrievedBookList = createAction(
  '[Books] Get books success',
  props<{ books: Book[] }>()
);

export const sortBookList = createAction(
  '[Books] Sorting books success',
  props<{ header: Header }>()
);

export const getBooks = createAction('[Books] Get books');
