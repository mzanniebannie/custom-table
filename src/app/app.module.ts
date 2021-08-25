import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BookEffect } from './book/book.effect';
import { BookService } from './book/book.service';
import { reducer as booksReducer } from './store/books.reducer';
import { TableComponent } from './table/table.component';
import { JoinPipe } from './pipes/join.pipe';
import { PrettifyPipe } from './pipes/prettify.pipe';
import { DatePipe } from '@angular/common';
import { reducer as gridReducer } from './store/gridsorts.reducer';

@NgModule({
  declarations: [AppComponent, TableComponent, JoinPipe, PrettifyPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    EffectsModule.forRoot([BookEffect]),
    StoreModule.forRoot({ books: booksReducer, gridSorts: gridReducer }),
  ],
  providers: [BookService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}