import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BookEffect } from './book/book.effect';
import { BookService } from './book/book.service';
import { reducer } from './store/books.reducer';
import { TableComponent } from './table/table.component';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [AppComponent, TableComponent, JoinPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    EffectsModule.forRoot([BookEffect]),
    StoreModule.forRoot({ books: reducer }),
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
