import { createAction, props } from '@ngrx/store';
import { Book } from '../book/book.model';
import { GridSort } from '../gridsort/gridsort.model';

export const retrievedBookList = createAction(
  '[Books] Get books success',
  props<{ books: Book[] }>()
);

export const sortBookList = createAction(
  '[Books] Sorting books success',
  props<{ gridSorts: GridSort[] }>()
);

export const getBooks = createAction('[Books] Get books');
