import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FileLoader } from './fileLoader/fileLoader.component';
import { MergeView } from './mergeView/mergeView.component';

@NgModule({
  declarations: [
    AppComponent,
    FileLoader,
    MergeView
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
