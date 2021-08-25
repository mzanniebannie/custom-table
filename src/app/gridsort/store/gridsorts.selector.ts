import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import { GridSort } from '../models/gridsort.model';

export const getGridSortsSelector = (state: AppState) => state.gridSorts;

export const getGridSorts = createSelector(
  getGridSortsSelector,
  (gridSorts: GridSort[]) => {
    return gridSorts;
  }
);
