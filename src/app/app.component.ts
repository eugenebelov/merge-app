import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Merge }  from './merge/merge.component';

import { MergeService } from './merge/merge.service';
import { DiffService } from './diffService/diff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MergeService, DiffService]
})
export class AppComponent {
  title = 'Merge files tool';

  @ViewChild(Merge)
  private mrg: Merge;

  // constructor( private mergeService: MergeService ){}

  public compare() {
    // this.mergeService.notifyOther({option: 'merge'});

    console.log("YOPTA", this.mrg.doMerge());
  }

}
