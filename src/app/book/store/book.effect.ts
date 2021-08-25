import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { BookService } from '../book.service';

@Injectable()
export class BookEffect {
  constructor(private actions$: Actions, private bookService: BookService) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Books] Get books'),
      mergeMap(() =>
        this.bookService
          .getBooks()
          .pipe(
            map((data) => ({ type: '[Books] Get books success', books: data }))
          )
      )
    )
  );
}
