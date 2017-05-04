import { Injectable, Inject }   from '@angular/core';
import { Subject }              from 'rxjs/Subject';


@Injectable()
export class DiffService {
  private notify = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();

  constructor(){}

  /**
    Collect result into diffObj and notify subscriber
  */
  public make(elementSourceValue: string, elementTargetValue: string) {

    var diff1 = this.makeDataForDiff(elementSourceValue);
    var diff2 = this.makeDataForDiff(elementTargetValue);

    var differenceObject = this.findDiff(diff1, diff2);

    if (differenceObject) {
      this.notify.next({ difference: differenceObject });
    }
  }

  /**
    Process string from input data from textarea into Array
  */
  private makeDataForDiff(val: string):Array<string> {
    return val.split('\n').map(function(item) { return item.trim() } );
  }

  /**
    Mark compared items as [modified, deleted, added, non-modified],
    regarding conditions
  */
  private compareResults(source: Array<string>, target: Array<string>) {
    if(source.length > target.length) {
    	return source.map(function(item, index) {
      	if(index < target.length) {
        	return {
          	'modified': true,
            'value': item + '/' + target[index]
          }
        } else {
        	return {
          	'deleted': true,
            'value': item
          }
        }
      });
    } else {
    	return target.map(function(item, index) {
      	if(index < source.length) {
        	return {
          	'modified': true,
            'value': item + '/' + source[index]
          }
        } else {
        	return {
          	'added': true,
            'value': item
          }
        }
      });
    }
  }

  /**
    Diff algorythm
  */
  private findDiff(source: Array<any>, target: Array<any>): Array<any> {
    var result: Array<any> = [];
    var tempS1 = [];
    var tempS2 = [];
    var curIndex = 0;
    var curIndex2 = 0;

    for(let i = 0; i < target.length; i++) {
    	for(let j = 0; j < source.length; j++) {
      	if(target[i] == source[j] && j >= curIndex) {
        	tempS1 = source.slice(curIndex, j);
					tempS2 = target.slice(curIndex2, i);

          result = result.concat(this.compareResults(tempS1, tempS2));
          result.push({'modified': false, 'value':source[j]})

          curIndex = j+1;
          curIndex2 = i+1;
        }
      }
    }

    tempS1 = source.slice(curIndex, source.length);
    tempS2 = target.slice(curIndex2, target.length);

    result = result.concat(this.compareResults(tempS1, tempS2));

    return result;
  }

  /**
    Mark item object with signs regarding it's state
    note: not using now, cause it was done inside component template
  */
  private markItems(param: any): string {
    if(param.modified != undefined && param.modified) return " * ";
    if(param.modified != undefined && !param.modified) return " &nbsp; ";
    if(param.added != undefined && param.added) return " + ";
    if(param.deleted != undefined && param.deleted) return " - ";
  }


}
