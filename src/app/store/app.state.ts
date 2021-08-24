import { Book } from '../book/book.model';
import { GridSort } from '../gridsort/gridsort.model';

export interface AppState {
  books: Book[];
  gridSorts: GridSort[];
}
