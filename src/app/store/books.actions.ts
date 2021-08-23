import { createAction, props } from '@ngrx/store';
import { Book } from '../book/book.model';

export const retrievedBookList = createAction(
  '[Books] Get books success',
  props<{ books: Book[] }>()
);

export const getBooks = createAction('[Books] Get books');
