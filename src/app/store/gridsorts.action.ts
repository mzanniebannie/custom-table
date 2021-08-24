import { createAction, props } from '@ngrx/store';
import { Header } from '../table/table.component';

export const addSort = createAction(
  '[Sort] Add sort',
  props<{ header: Header }>()
);

export const removeSort = createAction(
  '[Sort] Remove sort',
  props<{ header: Header }>()
);
