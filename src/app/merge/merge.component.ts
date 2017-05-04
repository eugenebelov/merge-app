import { Component} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DiffService } from '../diffService/diff.service';

@Component({
  selector: 'merge-view',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class Merge {
  titleSource = 'Source';
  titleTarget = 'Target';
  sourceValue = '';
  targetValue = '';

  constructor(private diffService: DiffService) {}

  /**
    Run method of diffService and start Observable stream inside it
  */
  public doMerge() {
    this.diffService.make(this.sourceValue, this.targetValue);
  }
}
