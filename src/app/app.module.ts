import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FileLoader } from './fileLoader/fileLoader.component';
import { Merge } from './merge/merge.component';
import { ParsedResult } from './parsed/parsedResult.component';

@NgModule({
  declarations: [
    AppComponent,
    FileLoader,
    Merge,
    ParsedResult
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
