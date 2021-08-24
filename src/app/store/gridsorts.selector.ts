import { createSelector } from '@ngrx/store';
import { GridSort } from '../gridsort/gridsort.model';
import { AppState } from './app.state';

export const getGridSortsSelector = (state: AppState) => state.gridSorts;

export const getGridSorts = createSelector(
  getGridSortsSelector,
  (gridSorts: GridSort[]) => {
    debugger;
    return gridSorts;
  }
);
