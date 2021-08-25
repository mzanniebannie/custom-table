import { Book } from './book/models/book.model';
import { GridSort } from './gridsort/models/gridsort.model';

export interface AppState {
  books: Book[];
  gridSorts: GridSort[];
}
