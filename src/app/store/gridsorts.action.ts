import { createAction, props } from '@ngrx/store';
import { Header } from '../table/table.component';

export const updateHeaderSort = createAction(
  '[Sort] Header sort changed',
  props<{ header: Header }>()
);
