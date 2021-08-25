import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { Sort } from 'src/app/util/sort';
import { GridSort } from '../models/gridsort.model';

import { updateHeaderSort } from './gridsorts.action';

export const initialState: GridSort[] = [];

const gridSortReducer = createReducer(
  initialState,
  on(updateHeaderSort, (state, { header }) => {
    let stateClone = cloneDeep(state);
    const matchedSort = stateClone.filter(
      (gs) => gs.key === header.property
    )[0];

    if (matchedSort) {
      const nextSort = new Sort().getNextSort(matchedSort.sort);

      if (nextSort === 'none') {
        stateClone = stateClone.filter((item) => item.key !== matchedSort.key);
      } else {
        matchedSort.sort = nextSort;
      }
    } else {
      stateClone.push({ key: header.property, sort: 'asc', type: header.type });
    }
    return stateClone;
  })
);

export function reducer(state: any, action: Action) {
  return gridSortReducer(state, action);
}
