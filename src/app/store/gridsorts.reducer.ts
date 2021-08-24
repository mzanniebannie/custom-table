import { Action, createReducer, on } from '@ngrx/store';
import { GridSort } from '../gridsort/gridsort.model';
import { addSort, removeSort } from './gridsorts.action';

export const initialState: ReadonlyArray<GridSort> = [];

const gridSortReducer = createReducer(
  initialState,
  on(addSort, (state, { header }) => {
    debugger;
    return [...state, { field: header.property, sort: header.sort }];
  }),
  on(removeSort, (state, { header }) => {
    debugger;
    return state.filter((sort) => sort.field == header.property);
  })
);

export function reducer(state: any, action: Action) {
  return gridSortReducer(state, action);
}
