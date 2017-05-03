import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DiffService } from '../diffService/diff.service';

@Component({
  selector: 'parsed-result',
  templateUrl: './parsedResult.component.html',
  styleUrls: ['parsedResult.component.css']
})
export class ParsedResult {
  titleSource = "Source";
  titleTarget = "Target";

  private subscribeToDiff: Subscription;
  private difference:Array<any>;

  constructor(private diffService: DiffService) {}

  ngOnInit() {
    this.subscribeToDiff = this.diffService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('difference')) {
        this.buildResult(res.difference);
      }
    });
  }

  ngOnDestroy() {
    this.subscribeToDiff.unsubscribe();
  }

  private buildResult(diff:Array<any>) {
    console.debug('buildResult', diff);
    this.difference = diff;
  }
}
