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

  public make(elementSourceValue: string, elementTargetValue: string) {

    var r1 = this.makeDataForDiff(elementSourceValue);
    var r2 = this.makeDataForDiff(elementTargetValue);

    var differenceObject = this.findDiff(r1, r2);

    if (differenceObject) {
      this.notify.next({ difference: differenceObject });
    }
  }

  private makeDataForDiff(val: string):Array<string> {
    return val.split('\n').map(function(item) { return item.trim() } );
  }

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

  private markItems(param: any): string {
    if(param.modified != undefined && param.modified) return " * ";
    if(param.modified != undefined && !param.modified) return " &nbsp; ";
    if(param.added != undefined && param.added) return " + ";
    if(param.deleted != undefined && param.deleted) return " - ";
  }


}
