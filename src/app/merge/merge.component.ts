import { Component} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DiffService } from '../diffService/diff.service';

@Component({
  selector: 'merge-view',
  templateUrl: './merge.component.html'
})
export class Merge {
  titleSource = 'Source';
  titleTarget = 'Target';
  sourceValue = 'Some \nSimple \nText Text \nFile';
  targetValue = 'Another \nText Text \nFile \nWith \nAdditional \nLines';

  constructor(private diffService: DiffService) {}

  public doMerge() {
    this.diffService.make(this.sourceValue, this.targetValue);
  }
}
