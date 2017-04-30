import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MergeService } from './merge.service';

@Component({
  selector: 'merge-view',
  templateUrl: './merge.component.html'
})
export class Merge {
  titleSource = "Source";
  titleTarget = "Target";

  private subscription: Subscription;

  constructor(private mergeService: MergeService) {}

  public doMerge() {
    return "HAHAH";
  }

  ngOnInit() {
    this.subscription = this.mergeService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'merge') {
        console.log(this.doMerge());
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
