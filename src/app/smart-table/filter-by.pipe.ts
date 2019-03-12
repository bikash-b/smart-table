import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  keys = [];
transform(items: any, args: string): any {

if (items != null && items.length > 0) {
  let ans = [];

  if (this.keys.length == 0) {
    this.keys = Object.keys(items[0]);
  }

  for (let i of items) {
    for (let k of this.keys) {
      if (i[k] && i[k].toString().toLowerCase().match('^.*' + args.toString().toLowerCase() +'.*$')) {
        ans.push(i);
        break;
      }
    }
  }
  return ans;
}
 }
}
