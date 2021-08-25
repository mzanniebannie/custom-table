import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BookService } from './book/book.service';
import { TableComponent } from './table/table.component';
import { PrettifyPipe } from './pipes/prettify.pipe';
import { DatePipe } from '@angular/common';
import { BookEffect } from './book/store/book.effect';
import { reducer as booksReducer } from './book/store/books.reducer';
import { reducer as gridSortsReducer } from './gridsort/store/gridsorts.reducer';

@NgModule({
  declarations: [AppComponent, TableComponent, PrettifyPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    EffectsModule.forRoot([BookEffect]),
    StoreModule.forRoot({ books: booksReducer, gridSorts: gridSortsReducer }),
  ],
  providers: [BookService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
